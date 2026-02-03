import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/shared/Chatbot';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { toast } from 'sonner';
import { createSubmission } from '@/services/submissions.service';
import type { SubmissionCategory, SubmissionType } from '@/types/submission';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Endereço',
    details: ['Rua da Graça, 123', 'Lisboa, Portugal 1170-165'],
    color: 'from-[#00BFA5] to-emerald-500',
  },
  {
    icon: Phone,
    title: 'Telefone',
    details: ['+351 123 456 789', '+351 987 654 321'],
    color: 'from-[#9C27B0] to-purple-500',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@thegraces.org', 'suporte@thegraces.org'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Clock,
    title: 'Horário',
    details: ['Segunda - Sexta: 9h - 18h', 'Sábado: 10h - 14h'],
    color: 'from-blue-500 to-cyan-500',
  },
];

const faqItems = [
  {
    question: 'Como posso me tornar membro?',
    answer:
      'Você pode se tornar membro clicando em "Seja Membro" no menu principal. O processo é simples e leva apenas alguns minutos.',
  },
  {
    question: 'Quais são os benefícios de ser membro?',
    answer:
      'Membros têm acesso a eventos exclusivos, workshops, networking com outros membros e a oportunidade de participar ativamente das iniciativas da associação.',
  },
  {
    question: 'Como posso fazer uma doação?',
    answer:
      'Aceitamos doações através de transferência bancária, cartão de crédito ou MB Way. Visite nossa página de doações para mais informações.',
  },
  {
    question: 'Posso ser voluntário sem ser membro?',
    answer:
      'Sim! Temos programas de voluntariado abertos a todos. Entre em contato conosco para conhecer as oportunidades disponíveis.',
  },
];

export default function Contato() {
  const [formType, setFormType] = useState<SubmissionType>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: '' as '' | SubmissionCategory,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: '',
  });

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: '',
    };

    let isValid = true;

    // Validar nome (mínimo 3 caracteres)
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
      isValid = false;
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    // Validar telefone (opcional, mas se preenchido deve ter mínimo 9 dígitos)
    if (formData.phone.trim() && formData.phone.replace(/\D/g, '').length < 9) {
      newErrors.phone = 'Telefone deve ter no mínimo 9 dígitos';
      isValid = false;
    }

    // Validar categoria
    if (!formData.category) {
      newErrors.category = 'Selecione uma categoria';
      isValid = false;
    }

    // Validar assunto (mínimo 5 caracteres)
    if (!formData.subject.trim()) {
      newErrors.subject = 'Assunto é obrigatório';
      isValid = false;
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Assunto deve ter no mínimo 5 caracteres';
      isValid = false;
    }

    // Validar mensagem (mínimo 10 caracteres)
    if (!formData.message.trim()) {
      newErrors.message = 'Mensagem é obrigatória';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mensagem deve ter no mínimo 10 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setIsSubmitting(true);

    try {
      await createSubmission({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        submission_type: formType,
        category: formData.category,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      // ✅ NOTIFICAÇÃO DE SUCESSO
      toast.success('Mensagem enviada com sucesso!', {
        description: 'Responderemos em breve. Obrigado pelo contato!',
        duration: 5000,
      });

      setIsSubmitted(true);

      // Resetar após 3 segundos
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          category: '',
        });
        setErrors({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          category: '',
        });
        setFormType('contact');
      }, 3000);
    } catch (err: any) {
      const data = err?.response?.data;

      if (data && typeof data === 'object') {
        const firstKey = Object.keys(data)[0];
        const msg = Array.isArray(data[firstKey]) ? data[firstKey][0] : 'Erro ao enviar.';
        toast.error(msg);
      } else {
        toast.error('Erro ao enviar. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5] via-teal-500 to-[#9C27B0]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Fale Conosco
              </span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                Estamos Aqui para{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Ajudar
                </span>
              </h1>
              <p className="text-xl text-white/95 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                Entre em contato conosco. Teremos prazer em responder suas dúvidas
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-white relative -mt-16 z-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4`}
                    >
                      <info.icon className="text-white" size={28} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#263238] mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 lg:py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Form */}
              <div>
                <Card className="border-none shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl text-[#263238]">
                      Envie sua Mensagem
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <Tabs value={formType} onValueChange={(v) => setFormType(v as SubmissionType)} className="w-full">
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger
                          value="contact"
                          className="data-[state=active]:bg-[#00BFA5] data-[state=active]:text-white"
                        >
                          <MessageSquare className="mr-2" size={16} />
                          Contato
                        </TabsTrigger>
                        <TabsTrigger
                          value="suggestion"
                          className="data-[state=active]:bg-[#00BFA5] data-[state=active]:text-white"
                        >
                          <Lightbulb className="mr-2" size={16} />
                          Sugestão
                        </TabsTrigger>
                        <TabsTrigger
                          value="complaint"
                          className="data-[state=active]:bg-[#00BFA5] data-[state=active]:text-white"
                        >
                          <AlertTriangle className="mr-2" size={16} />
                          Reclamação
                        </TabsTrigger>
                      </TabsList>

                      {isSubmitted ? (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 rounded-full bg-[#4CAF50]/10 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="text-[#4CAF50]" size={40} />
                          </div>
                          <h3 className="font-display font-bold text-2xl text-[#263238] mb-2">
                            Mensagem Enviada!
                          </h3>
                          <p className="text-gray-600">
                            Responderemos em breve. Obrigado pelo contato!
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* NOME */}
                            <div className="space-y-2">
                              <Label htmlFor="name">Nome Completo *</Label>
                              <Input
                                id="name"
                                placeholder="Seu nome"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                required
                                className={`h-12 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                disabled={isSubmitting}
                              />
                              {errors.name && (
                                <p className="text-xs text-red-600 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {errors.name}
                                </p>
                              )}
                              {/* ✅ SÓ MOSTRA SE TEM TEXTO E É INSUFICIENTE */}
                              {!errors.name && formData.name.trim().length > 0 && formData.name.trim().length < 3 && (
                                <p className="text-xs text-amber-600">
                                  Mínimo: 3 caracteres
                                </p>
                              )}
                            </div>

                            {/* EMAIL */}
                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                required
                                className={`h-12 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                disabled={isSubmitting}
                              />
                              {errors.email && (
                                <p className="text-xs text-red-600 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {errors.email}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* TELEFONE */}
                            <div className="space-y-2">
                              <Label htmlFor="phone">Telefone</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+258 84 000 0000"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className={`h-12 ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                disabled={isSubmitting}
                              />
                              {errors.phone && (
                                <p className="text-xs text-red-600 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {errors.phone}
                                </p>
                              )}
                              {/* ✅ SÓ MOSTRA SE TEM TEXTO E É INSUFICIENTE */}
                              {!errors.phone && formData.phone.trim().length > 0 && formData.phone.replace(/\D/g, '').length < 9 && (
                                <p className="text-xs text-amber-600">
                                  Mínimo: 9 dígitos
                                </p>
                              )}
                            </div>

                            {/* CATEGORIA */}
                            <div className="space-y-2">
                              <Label htmlFor="category">Categoria *</Label>
                              <Select
                                value={formData.category}
                                onValueChange={(value) => handleInputChange('category', value)}
                                disabled={isSubmitting}
                              >
                                <SelectTrigger className={`h-12 ${errors.category ? 'border-red-500 focus-visible:ring-red-500' : ''}`}>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="general">Geral</SelectItem>
                                  <SelectItem value="association">Associação</SelectItem>
                                  <SelectItem value="events">Eventos</SelectItem>
                                  <SelectItem value="donations">Doações</SelectItem>
                                  <SelectItem value="volunteering">Voluntariado</SelectItem>
                                  <SelectItem value="other">Outro</SelectItem>
                                </SelectContent>
                              </Select>
                              {errors.category && (
                                <p className="text-xs text-red-600 flex items-center gap-1">
                                  <AlertTriangle className="h-3 w-3" />
                                  {errors.category}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* ASSUNTO */}
                          <div className="space-y-2">
                            <Label htmlFor="subject">Assunto *</Label>
                            <Input
                              id="subject"
                              placeholder="Assunto da mensagem"
                              value={formData.subject}
                              onChange={(e) => handleInputChange('subject', e.target.value)}
                              required
                              className={`h-12 ${errors.subject ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                              disabled={isSubmitting}
                            />
                            {errors.subject && (
                              <p className="text-xs text-red-600 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {errors.subject}
                              </p>
                            )}
                            {/* ✅ SÓ MOSTRA SE TEM TEXTO E É INSUFICIENTE */}
                            {!errors.subject && formData.subject.trim().length > 0 && formData.subject.trim().length < 5 && (
                              <p className="text-xs text-amber-600">
                                Mínimo: 5 caracteres
                              </p>
                            )}
                          </div>

                          {/* MENSAGEM */}
                          <div className="space-y-2">
                            <Label htmlFor="message">Mensagem *</Label>
                            <Textarea
                              id="message"
                              placeholder="Escreva sua mensagem aqui... (mínimo 10 caracteres)"
                              value={formData.message}
                              onChange={(e) => handleInputChange('message', e.target.value)}
                              required
                              rows={6}
                              className={`resize-none ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                              disabled={isSubmitting}
                            />
                            {errors.message && (
                              <p className="text-xs text-red-600 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                {errors.message}
                              </p>
                            )}
                            {/* ✅ SÓ MOSTRA SE TEM TEXTO E É INSUFICIENTE */}
                            {!errors.message && formData.message.trim().length > 0 && formData.message.trim().length < 10 && (
                              <p className="text-xs text-amber-600">
                                Mínimo: 10 caracteres
                              </p>
                            )}
                          </div>

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-[#00BFA5] hover:bg-[#00BFA5]/90 h-14 text-lg"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <div className="flex items-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Enviando...
                              </div>
                            ) : (
                              <>
                                <Send className="mr-2" size={20} />
                                Enviar Mensagem
                              </>
                            )}
                          </Button>
                        </form>
                      )}
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ & Map */}
              <div className="space-y-8">
                {/* FAQ */}
                <Card className="border-none shadow-xl">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl text-[#263238]">
                      Perguntas Frequentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqItems.map((item, index) => (
                      <details key={index} className="group">
                        <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <span className="font-medium text-[#263238]">{item.question}</span>
                          <span className="text-[#00BFA5] group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div className="p-4 text-gray-600 leading-relaxed">{item.answer}</div>
                      </details>
                    ))}
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card className="border-none shadow-xl overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-[#B2DFDB] to-[#E1BEE7]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-[#00BFA5] mx-auto mb-2" />
                        <p className="font-display font-bold text-[#263238]">Rua da Graça, 123</p>
                        <p className="text-gray-600">Lisboa, Portugal</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Rua%20da%20Gra%C3%A7a%2C%20123%2C%20Lisboa"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MapPin className="mr-2" size={16} />
                        Ver no Google Maps
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}