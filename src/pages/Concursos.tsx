import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/shared/Chatbot';
import { Trophy, Calendar, Users, Clock, Award, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const contests = [
  {
    id: 1,
    title: 'Concurso de Fotografia Social',
    description: 'Capture momentos que mostram o impacto da ação comunitária. Buscamos imagens que contem histórias de transformação social.',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    deadline: '30 de Março, 2024',
    daysLeft: 45,
    participants: 78,
    maxParticipants: 150,
    prize: '€500 + Exposição',
    category: 'Fotografia',
    status: 'active',
    rules: [
      'Fotos devem ser originais e inéditas',
      'Tema: Impacto Social na Comunidade',
      'Máximo de 3 fotografias por participante',
      'Formato: JPEG ou PNG, mínimo 3000px',
    ],
  },
  {
    id: 2,
    title: 'Projeto de Inovação Social',
    description: 'Apresente ideias inovadoras para resolver desafios comunitários. O melhor projeto receberá apoio para implementação.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    deadline: '15 de Abril, 2024',
    daysLeft: 61,
    participants: 34,
    maxParticipants: 50,
    prize: '€1000 + Mentoria',
    category: 'Projetos',
    status: 'active',
    rules: [
      'Projetos devem abordar problemas sociais reais',
      'Apresentação em formato pitch deck',
      'Equipes de até 4 pessoas',
      'Demonstrar viabilidade e impacto',
    ],
  },
  {
    id: 3,
    title: 'Concurso de Redação Solidária',
    description: 'Escreva sobre solidariedade e seu impacto na sociedade. Textos selecionados serão publicados em nossa revista.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
    deadline: '1 de Maio, 2024',
    daysLeft: 77,
    participants: 56,
    maxParticipants: 200,
    prize: '€300 + Publicação',
    category: 'Literatura',
    status: 'active',
    rules: [
      'Textos entre 1000 e 2500 palavras',
      'Tema: Solidariedade em Ação',
      'Originais e inéditos',
      'Formato: Word ou PDF',
    ],
  },
  {
    id: 4,
    title: 'Hackathon Solidário 2023',
    description: 'Desenvolvimento de soluções tecnológicas para ONGs locais.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    deadline: '10 de Dezembro, 2023',
    daysLeft: 0,
    participants: 120,
    maxParticipants: 120,
    prize: '€2000 + Implementação',
    category: 'Tecnologia',
    status: 'finished',
    winner: 'Equipe CodeForGood',
    rules: [],
  },
];

const categories = ['Todos', 'Fotografia', 'Projetos', 'Literatura', 'Tecnologia'];

export default function Concursos() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeTab, setActiveTab] = useState('active');

  const filteredContests = contests.filter((contest) => {
    const matchesCategory = selectedCategory === 'Todos' || contest.category === selectedCategory;
    const matchesStatus = contest.status === activeTab;
    return matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-[#9C27B0]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Trophy className="inline mr-2" size={16} />
                Concursos
              </span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                Mostre seu{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Talento
                </span>
              </h1>
              <p className="text-xl text-white/95 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                Participe dos nossos concursos e contribua para causas que importam
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-white relative -mt-16 z-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '15+', label: 'Concursos Realizados', icon: Trophy },
                { value: '500+', label: 'Participantes', icon: Users },
                { value: '€10K+', label: 'Em Prêmios', icon: Award },
                { value: '25+', label: 'Vencedores', icon: CheckCircle2 },
              ].map((stat, index) => (
                <Card key={index} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-[#9C27B0]/10 flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="text-amber-500" size={24} />
                    </div>
                    <div className="text-3xl font-display font-bold text-[#263238]">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contests List */}
        <section className="py-20 lg:py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                <TabsList className="bg-white shadow-md rounded-full p-1">
                  <TabsTrigger 
                    value="active" 
                    className="rounded-full px-8 data-[state=active]:bg-[#00BFA5] data-[state=active]:text-white"
                  >
                    Concursos Ativos
                  </TabsTrigger>
                  <TabsTrigger 
                    value="finished"
                    className="rounded-full px-8 data-[state=active]:bg-[#00BFA5] data-[state=active]:text-white"
                  >
                    Encerrados
                  </TabsTrigger>
                </TabsList>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? 'bg-amber-500 hover:bg-amber-500/90 rounded-full'
                          : 'rounded-full hover:border-amber-500 hover:text-amber-500'
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <TabsContent value="active">
                {filteredContests.length > 0 ? (
                  <div className="space-y-8">
                    {filteredContests.map((contest) => (
                      <ContestCard key={contest.id} contest={contest} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Nenhum concurso ativo encontrado nesta categoria.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="finished">
                {filteredContests.length > 0 ? (
                  <div className="space-y-8">
                    {filteredContests.map((contest) => (
                      <ContestCard key={contest.id} contest={contest} isFinished />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Nenhum concurso encerrado encontrado.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

interface ContestCardProps {
  contest: typeof contests[0];
  isFinished?: boolean;
}

function ContestCard({ contest, isFinished }: ContestCardProps) {
  const [showRules, setShowRules] = useState(false);
  const progressPercent = (contest.participants / contest.maxParticipants) * 100;

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <img
            src={contest.image}
            alt={contest.title}
            className={`w-full h-full object-cover ${isFinished ? 'grayscale' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r" />
          <Badge className="absolute top-4 left-4 bg-amber-500 hover:bg-amber-500/90 font-accent">
            {contest.category}
          </Badge>
          {isFinished && (
            <Badge className="absolute top-4 right-4 bg-gray-500 hover:bg-gray-500/90 font-accent">
              Encerrado
            </Badge>
          )}
        </div>

        <CardContent className="lg:col-span-2 p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-display font-bold text-2xl lg:text-3xl text-[#263238] mb-3">
                {contest.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {contest.description}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2 text-[#00BFA5]" />
                  <div>
                    <div className="text-xs text-gray-500">Prazo</div>
                    <div className="text-sm font-medium">{contest.deadline}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-2 text-[#00BFA5]" />
                  <div>
                    <div className="text-xs text-gray-500">Participantes</div>
                    <div className="text-sm font-medium">{contest.participants}/{contest.maxParticipants}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Trophy size={18} className="mr-2 text-amber-500" />
                  <div>
                    <div className="text-xs text-gray-500">Prêmio</div>
                    <div className="text-sm font-semibold text-amber-600">{contest.prize}</div>
                  </div>
                </div>
                {!isFinished && (
                  <div className="flex items-center text-gray-600">
                    <Clock size={18} className="mr-2 text-[#9C27B0]" />
                    <div>
                      <div className="text-xs text-gray-500">Restam</div>
                      <div className="text-sm font-medium">{contest.daysLeft} dias</div>
                    </div>
                  </div>
                )}
                {isFinished && contest.winner && (
                  <div className="flex items-center text-gray-600">
                    <Award size={18} className="mr-2 text-amber-500" />
                    <div>
                      <div className="text-xs text-gray-500">Vencedor</div>
                      <div className="text-sm font-semibold text-amber-600">{contest.winner}</div>
                    </div>
                  </div>
                )}
              </div>

              {!isFinished && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Vagas preenchidas</span>
                    <span className="font-semibold">{Math.round(progressPercent)}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
              )}

              {/* Rules */}
              {!isFinished && contest.rules.length > 0 && (
                <div>
                  <button
                    onClick={() => setShowRules(!showRules)}
                    className="flex items-center text-[#00BFA5] hover:text-[#00BFA5]/80 font-medium text-sm mb-3"
                  >
                    <FileText size={16} className="mr-2" />
                    {showRules ? 'Ocultar Regras' : 'Ver Regras'}
                  </button>
                  
                  {showRules && (
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      {contest.rules.map((rule, index) => (
                        <div key={index} className="flex items-start text-sm text-gray-600">
                          <CheckCircle2 size={16} className="mr-2 text-[#00BFA5] flex-shrink-0 mt-0.5" />
                          {rule}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 lg:w-48">
              {!isFinished ? (
                <>
                  <Button size="lg" className="bg-[#00BFA5] hover:bg-[#00BFA5]/90 group">
                    Participar
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                  <Button size="lg" variant="outline" className="border-[#9C27B0] text-[#9C27B0] hover:bg-[#9C27B0] hover:text-white">
                    Ver Detalhes
                  </Button>
                </>
              ) : (
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-600">
                  Ver Resultados
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
