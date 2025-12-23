import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/shared/Chatbot';
import { Users, Award, Heart, Star, ArrowRight, Linkedin, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const boardMembers = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Presidente',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Liderando com paixão e dedicação há 5 anos. Maria é responsável pela visão estratégica da organização.',
    linkedin: '#',
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Vice-Presidente',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Especialista em gestão de projetos sociais com mais de 10 anos de experiência no terceiro setor.',
    linkedin: '#',
  },
  {
    id: 3,
    name: 'Ana Costa',
    role: 'Diretora de Eventos',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: 'Criando experiências memoráveis para a comunidade. Ana coordena todos os eventos da associação.',
    linkedin: '#',
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    role: 'Tesoureiro',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Garantindo transparência e sustentabilidade financeira. Pedro administra os recursos da ONG.',
    linkedin: '#',
  },
];

const teamMembers = [
  {
    id: 5,
    name: 'Sofia Rodrigues',
    role: 'Coordenadora de Voluntários',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    department: 'Voluntariado',
  },
  {
    id: 6,
    name: 'Miguel Ferreira',
    role: 'Gestor de Comunicação',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    department: 'Marketing',
  },
  {
    id: 7,
    name: 'Inês Martins',
    role: 'Coordenadora de Projetos',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    department: 'Projetos',
  },
  {
    id: 8,
    name: 'Ricardo Alves',
    role: 'Desenvolvedor Web',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    department: 'Tecnologia',
  },
  {
    id: 9,
    name: 'Beatriz Lopes',
    role: 'Designer Gráfico',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    department: 'Marketing',
  },
  {
    id: 10,
    name: 'Tiago Sousa',
    role: 'Assistente Administrativo',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80',
    department: 'Administração',
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Comunidade Ativa',
    description: 'Conecte-se com pessoas que compartilham seus valores e propósitos.',
  },
  {
    icon: Award,
    title: 'Eventos Exclusivos',
    description: 'Acesso prioritário a galas, workshops e atividades especiais.',
  },
  {
    icon: Heart,
    title: 'Impacto Real',
    description: 'Participe ativamente de projetos que transformam vidas.',
  },
  {
    icon: Star,
    title: 'Desenvolvimento',
    description: 'Oportunidades de crescimento pessoal e profissional.',
  },
];

export default function Membros() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9C27B0] via-purple-600 to-[#00BFA5]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Nossa Equipe
              </span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                Pessoas que{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Fazem Acontecer
                </span>
              </h1>
              <p className="text-xl text-white/95 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                Conheça os membros dedicados que tornam nossa missão possível
              </p>
            </div>
          </div>
        </section>

        {/* Board Members */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-[#E1BEE7] text-[#9C27B0] rounded-full text-sm font-accent font-medium mb-6">
                Direção
              </span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
                Conselho Diretivo
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Líderes comprometidos com a nossa missão de transformar vidas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {boardMembers.map((member, index) => (
                <Card
                  key={member.id}
                  className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#263238] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display font-bold text-xl text-white">{member.name}</h3>
                      <p className="text-[#00BFA5] font-accent font-medium">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 rounded-full">
                        <Linkedin size={16} className="mr-2" />
                        LinkedIn
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full">
                        <Mail size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20 lg:py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-[#B2DFDB] text-[#00BFA5] rounded-full text-sm font-accent font-medium mb-6">
                Equipe
              </span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
                Nossa Equipe
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Profissionais dedicados que trabalham nos bastidores
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="group text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-24 h-24 mx-auto ring-4 ring-white shadow-xl group-hover:ring-[#00BFA5]/30 transition-all duration-300">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] text-white text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9C27B0] hover:bg-[#9C27B0]/90 text-xs">
                      {member.department}
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-sm text-[#263238] group-hover:text-[#00BFA5] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-xs">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Member CTA */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-display font-extrabold text-4xl lg:text-6xl text-white mb-6">
                  Junte-se a Nós
                </h2>
                <p className="text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
                  Torne-se membro da The Graces OAC e faça parte de uma comunidade que transforma vidas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-none bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="text-white" size={28} />
                      </div>
                      <h3 className="font-display font-bold text-lg text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-white text-[#00BFA5] hover:bg-white/90 text-lg px-10 py-7 h-auto font-bold shadow-xl group"
                  asChild
                >
                  <Link to="/registrar">
                    Tornar-se Membro
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </Button>
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
