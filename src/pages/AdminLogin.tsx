import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, Shield, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - in production this would validate against a backend
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo credentials: admin@thegraces.org / Demo@2024
    if (email === 'admin@thegraces.org' && password === 'Demo@2024') {
      navigate('/admin');
    } else {
      alert('Credenciais inválidas. Use: admin@thegraces.org / Demo@2024');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#263238] via-gray-900 to-[#263238] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00BFA5]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9C27B0]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#00BFA5]/10 to-[#9C27B0]/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-display font-bold text-2xl">TG</span>
            </div>
          </Link>
          <h1 className="mt-4 font-display font-bold text-3xl text-white">
            Painel Administrativo
          </h1>
          <p className="mt-2 text-gray-400">
            The Graces OAC
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-md">
          <CardHeader className="space-y-1 text-center pb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#00BFA5]/10 to-[#9C27B0]/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <Shield className="text-[#00BFA5]" size={28} />
            </div>
            <CardTitle className="text-2xl font-display font-bold text-[#263238]">
              Acesso Restrito
            </CardTitle>
            <CardDescription className="text-base">
              Entre com suas credenciais de administrador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@thegraces.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 h-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#00BFA5] to-[#00BFA5] hover:from-[#00BFA5] hover:to-[#9C27B0] h-12 text-lg font-semibold shadow-lg shadow-[#00BFA5]/30 hover:shadow-[#00BFA5]/50 transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Entrando...
                  </div>
                ) : (
                  'Entrar no Painel'
                )}
              </Button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-amber-700 font-medium mb-2">
                🔑 Credenciais de Demonstração:
              </p>
              <p className="text-sm text-amber-600">
                Email: <code className="bg-amber-100 px-1 rounded">admin@thegraces.org</code>
              </p>
              <p className="text-sm text-amber-600">
                Senha: <code className="bg-amber-100 px-1 rounded">Demo@2024</code>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-gray-500 hover:text-[#00BFA5] transition-colors">
                ← Voltar para o site
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-6">
          © 2024 The Graces OAC. Acesso apenas para administradores.
        </p>
      </div>
    </div>
  );
}
