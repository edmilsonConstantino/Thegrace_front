import { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Trophy,
  Search,
  MoreVertical,
  Users,
  Calendar,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const contests = [
  {
    id: 1,
    title: 'Concurso de Fotografia Social',
    description: 'Capture momentos que mostram o impacto da ação comunitária',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&q=80',
    deadline: '30 Mar 2024',
    participants: 78,
    maxParticipants: 150,
    prize: '€500 + Exposição',
    status: 'active',
    category: 'Fotografia',
  },
  {
    id: 2,
    title: 'Projeto de Inovação Social',
    description: 'Apresente ideias inovadoras para resolver desafios comunitários',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
    deadline: '15 Abr 2024',
    participants: 34,
    maxParticipants: 50,
    prize: '€1000 + Mentoria',
    status: 'active',
    category: 'Projetos',
  },
  {
    id: 3,
    title: 'Hackathon Solidário 2023',
    description: 'Desenvolvimento de soluções tecnológicas para ONGs locais',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
    deadline: '10 Dez 2023',
    participants: 120,
    maxParticipants: 120,
    prize: '€2000 + Implementação',
    status: 'finished',
    category: 'Tecnologia',
    winner: 'Equipe CodeForGood',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Ativo</Badge>;
    case 'draft':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Rascunho</Badge>;
    case 'finished':
      return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Encerrado</Badge>;
    default:
      return null;
  }
};

export default function AdminConcursos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredContests = contests.filter((contest) => {
    const matchesSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || contest.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#263238]">
            Gerenciar Concursos
          </h1>
          <p className="text-gray-500 mt-1">
            Crie e gerencie os concursos da associação.
          </p>
        </div>
        <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90">
          <Plus className="mr-2" size={18} />
          Novo Concurso
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Concursos', value: '15', color: 'from-amber-500 to-orange-500', icon: Trophy },
          { label: 'Ativos', value: '3', color: 'from-green-500 to-emerald-500', icon: CheckCircle2 },
          { label: 'Participantes', value: '232', color: 'from-blue-500 to-cyan-500', icon: Users },
          { label: 'Prêmios Entregues', value: '€8.5K', color: 'from-[#9C27B0] to-purple-500', icon: Award },
        ].map((stat, index) => (
          <Card key={index} className="border-none shadow-md">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white" size={22} />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-[#263238]">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-none shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar concursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Ativos</TabsTrigger>
                <TabsTrigger value="draft">Rascunhos</TabsTrigger>
                <TabsTrigger value="finished">Encerrados</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Contests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContests.map((contest) => {
          const progress = (contest.participants / contest.maxParticipants) * 100;
          return (
            <Card key={contest.id} className="border-none shadow-lg overflow-hidden">
              <div className="flex">
                <div className="w-40 h-full relative">
                  <img 
                    src={contest.image} 
                    alt={contest.title}
                    className={`w-full h-full object-cover ${contest.status === 'finished' ? 'grayscale' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                </div>
                <CardContent className="flex-1 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusBadge(contest.status)}
                        <Badge variant="outline">{contest.category}</Badge>
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#263238]">
                        {contest.title}
                      </h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2" size={14} />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit2 className="mr-2" size={14} />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2" size={14} />
                          Ver Inscritos
                        </DropdownMenuItem>
                        {contest.status === 'active' && (
                          <DropdownMenuItem>
                            <Award className="mr-2" size={14} />
                            Selecionar Vencedor
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2" size={14} />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {contest.description}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <Calendar className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                      <p className="text-xs text-gray-500">Prazo</p>
                      <p className="text-sm font-semibold">{contest.deadline}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <Users className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                      <p className="text-xs text-gray-500">Inscritos</p>
                      <p className="text-sm font-semibold">{contest.participants}</p>
                    </div>
                    <div className="text-center p-2 bg-amber-50 rounded-lg">
                      <Trophy className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                      <p className="text-xs text-amber-600">Prêmio</p>
                      <p className="text-sm font-semibold text-amber-700">{contest.prize}</p>
                    </div>
                  </div>

                  {contest.status !== 'finished' ? (
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Vagas preenchidas</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <Award className="text-amber-600" size={18} />
                      <div>
                        <p className="text-xs text-amber-600">Vencedor</p>
                        <p className="font-semibold text-amber-700">{contest.winner}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
