import { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  MapPin, 
  Users, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const events = [
  {
    id: 1,
    title: 'Gala de Caridade Anual',
    date: '15 de Março, 2024',
    time: '19:00',
    location: 'Centro de Convenções Lisboa',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
    category: 'Gala',
    attendees: 250,
    maxAttendees: 300,
    status: 'upcoming',
    featured: true,
  },
  {
    id: 2,
    title: 'Workshop de Liderança',
    date: '22 de Março, 2024',
    time: '14:00',
    location: 'Sede The Graces OAC',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    category: 'Workshop',
    attendees: 45,
    maxAttendees: 50,
    status: 'upcoming',
    featured: false,
  },
  {
    id: 3,
    title: 'Corrida Solidária 2024',
    date: '20 de Abril, 2024',
    time: '08:00',
    location: 'Parque das Nações',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80',
    category: 'Esporte',
    attendees: 180,
    maxAttendees: 500,
    status: 'draft',
    featured: true,
  },
  {
    id: 4,
    title: 'Festival Cultural 2023',
    date: '15 de Dezembro, 2023',
    time: '16:00',
    location: 'Praça Central',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
    category: 'Festival',
    attendees: 450,
    maxAttendees: 500,
    status: 'past',
    featured: false,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'upcoming':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Publicado</Badge>;
    case 'draft':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Rascunho</Badge>;
    case 'past':
      return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Encerrado</Badge>;
    default:
      return null;
  }
};

export default function AdminEventos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || event.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#263238]">
            Gerenciar Eventos
          </h1>
          <p className="text-gray-500 mt-1">
            Crie e gerencie os eventos da associação.
          </p>
        </div>
        <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90">
          <Plus className="mr-2" size={18} />
          Novo Evento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Eventos', value: '24', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
          { label: 'Próximos', value: '8', icon: Clock, color: 'from-green-500 to-emerald-500' },
          { label: 'Rascunhos', value: '3', icon: Edit2, color: 'from-amber-500 to-orange-500' },
          { label: 'Inscritos Total', value: '1.2K', icon: Users, color: 'from-[#9C27B0] to-purple-500' },
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
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="upcoming">Publicados</TabsTrigger>
                <TabsTrigger value="draft">Rascunhos</TabsTrigger>
                <TabsTrigger value="past">Encerrados</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline">
              <Filter className="mr-2" size={16} />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card className="border-none shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Evento</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Data</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Local</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Inscrições</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Status</th>
                  <th className="text-right p-4 font-semibold text-gray-600 text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => {
                  const progress = (event.attendees / event.maxAttendees) * 100;
                  return (
                    <tr key={event.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-[#263238]">{event.title}</p>
                              {event.featured && (
                                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">
                                  Destaque
                                </Badge>
                              )}
                            </div>
                            <Badge variant="outline" className="mt-1 text-xs">{event.category}</Badge>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar size={14} className="mr-2" />
                          {event.date}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">{event.time}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin size={14} className="mr-2" />
                          {event.location}
                        </div>
                      </td>
                      <td className="p-4 min-w-[180px]">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <Users size={14} />
                          {event.attendees}/{event.maxAttendees}
                        </div>
                        <Progress value={progress} className="h-2" />
                      </td>
                      <td className="p-4">
                        {getStatusBadge(event.status)}
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
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
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2" size={14} />
                              Check-in
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2" size={14} />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
