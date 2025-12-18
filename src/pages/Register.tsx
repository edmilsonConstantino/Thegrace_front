import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    interests: [] as string[],
    agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle registration logic here
      console.log('Registration data:', formData);
    }
  };

  const interests = [
    'Voluntariado',
    'Eventos Sociais',
    'Educação',
    'Saúde',
    'Meio Ambiente',
    'Cultura',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20 bg-gradient-to-br from-[#B2DFDB]/30 to-[#E1BEE7]/30">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <Card className="border-none shadow-2xl">
              <CardHeader className="space-y-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-display font-bold text-2xl">TG</span>
                </div>
                <CardTitle className="text-3xl font-display font-bold text-[#263238]">
                  Torne-se um Membro
                </CardTitle>
                <CardDescription className="text-base">
                  Junte-se à nossa comunidade e faça a diferença
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`flex items-center ${s < 3 ? 'flex-1' : ''}`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            s <= step
                              ? 'bg-[#00BFA5] text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {s}
                        </div>
                        {s < 3 && (
                          <div
                            className={`flex-1 h-1 mx-2 ${
                              s < step ? 'bg-[#00BFA5]' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Dados Pessoais</span>
                    <span>Interesses</span>
                    <span>Confirmação</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Personal Data */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome</Label>
                          <Input
                            id="firstName"
                            placeholder="João"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Sobrenome</Label>
                          <Input
                            id="lastName"
                            placeholder="Silva"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({ ...formData, lastName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+351 123 456 789"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Interests */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base mb-4 block">
                          Selecione suas áreas de interesse
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                          {interests.map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                              <Checkbox
                                id={interest}
                                checked={formData.interests.includes(interest)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData({
                                      ...formData,
                                      interests: [...formData.interests, interest],
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      interests: formData.interests.filter(
                                        (i) => i !== interest
                                      ),
                                    });
                                  }
                                }}
                              />
                              <label
                                htmlFor={interest}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                              >
                                {interest}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Confirmation */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="bg-[#B2DFDB]/30 rounded-lg p-6 space-y-3">
                        <h3 className="font-display font-bold text-lg text-[#263238]">
                          Revise suas informações
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-semibold">Nome:</span> {formData.firstName}{' '}
                            {formData.lastName}
                          </p>
                          <p>
                            <span className="font-semibold">Email:</span> {formData.email}
                          </p>
                          <p>
                            <span className="font-semibold">Telefone:</span> {formData.phone}
                          </p>
                          <p>
                            <span className="font-semibold">Interesses:</span>{' '}
                            {formData.interests.join(', ') || 'Nenhum selecionado'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, agreeTerms: checked as boolean })
                          }
                          required
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-gray-600 leading-relaxed cursor-pointer"
                        >
                          Concordo com os{' '}
                          <Link to="/termos" className="text-[#00BFA5] hover:underline">
                            Termos de Uso
                          </Link>{' '}
                          e{' '}
                          <Link to="/privacidade" className="text-[#00BFA5] hover:underline">
                            Política de Privacidade
                          </Link>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                        className="flex-1"
                      >
                        Voltar
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="flex-1 bg-[#00BFA5] hover:bg-[#00BFA5]/90"
                      disabled={step === 3 && !formData.agreeTerms}
                    >
                      {step === 3 ? 'Finalizar Registro' : 'Próximo'}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 text-center text-sm">
                  <span className="text-gray-600">Já tem uma conta? </span>
                  <Link to="/login" className="text-[#9C27B0] hover:underline font-semibold">
                    Faça login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
