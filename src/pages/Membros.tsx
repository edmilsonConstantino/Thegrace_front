import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/shared/Chatbot';
import { Users, Award, Heart, Star, ArrowRight, Linkedin, Mail, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

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
  const [boardMembers, setBoardMembers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL da sua API - AJUSTE CONFORME SEU BACKEND
  const API_BASE_URL = 'http://localhost:8000/api';

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        
        // Buscar membros da direção
        const boardResponse = await fetch(`${API_BASE_URL}/members/board/`);
        if (!boardResponse.ok) throw new Error('Erro ao buscar membros da direção');
        const boardData = await boardResponse.json();
        
        // Buscar membros da equipe
        const teamResponse = await fetch(`${API_BASE_URL}/members/team/`);
        if (!teamResponse.ok) throw new Error('Erro ao buscar membros da equipe');
        const teamData = await teamResponse.json();
        
        setBoardMembers(boardData);
        setTeamMembers(teamData);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar membros:', err);
        setError('Não foi possível carregar os membros. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-white pt-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-[#9C27B0] mx-auto mb-4" />
            <p className="text-gray-600">Carregando membros...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Nossa Equipe
              </span>
              <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
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

        {error && (
          <div className="container mx-auto px-4 lg:px-8 py-8">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Board Members */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-[#E1BEE7] text-[#9C27B0] rounded-full text-sm font-medium mb-6">
                Direção
              </span>
              <h2 className="font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
                Conselho Diretivo
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Líderes comprometidos com a nossa missão de transformar vidas
              </p>
            </div>

            {boardMembers.length === 0 ? (
              <p className="text-center text-gray-500">Nenhum membro da direção cadastrado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {boardMembers.map((member) => (
                  <Card
                    key={member.id}
                    className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                  >
                    <div className="relative h-72 overflow-hidden bg-gray-100">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9C27B0] to-[#00BFA5]">
                          <span className="text-white text-6xl font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#263238] via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-bold text-xl text-white">{member.name}</h3>
                        <p className="text-[#00BFA5] font-medium">{member.role}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {member.bio || 'Sem biografia disponível.'}
                      </p>
                      <div className="flex gap-2">
                        {member.linkedin && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1 rounded-full"
                            onClick={() => window.open(member.linkedin, '_blank')}
                          >
                            <Linkedin size={16} className="mr-2" />
                            LinkedIn
                          </Button>
                        )}
                        {member.email && (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="rounded-full"
                            onClick={() => window.location.href = `mailto:${member.email}`}
                          >
                            <Mail size={16} />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20 lg:py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-[#B2DFDB] text-[#00BFA5] rounded-full text-sm font-medium mb-6">
                Equipe
              </span>
              <h2 className="font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
                Nossa Equipe
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Profissionais dedicados que trabalham nos bastidores
              </p>
            </div>

            {teamMembers.length === 0 ? (
              <p className="text-center text-gray-500">Nenhum membro da equipe cadastrado.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="group text-center">
                    <div className="relative mb-4">
                      <Avatar className="w-24 h-24 mx-auto ring-4 ring-white shadow-xl group-hover:ring-[#00BFA5]/30 transition-all duration-300">
                        {member.image_url ? (
                          <AvatarImage src={member.image_url} alt={member.name} />
                        ) : null}
                        <AvatarFallback className="bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] text-white text-xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {member.department_display && (
                        <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#9C27B0] hover:bg-[#9C27B0]/90 text-xs">
                          {member.department_display}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-[#263238] group-hover:text-[#00BFA5] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-gray-500 text-xs">{member.role}</p>
                  </div>
                ))}
              </div>
            )}
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
                <h2 className="font-bold text-4xl lg:text-6xl text-white mb-6">
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
                      <h3 className="font-bold text-lg text-white mb-2">
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