import { 
  Users, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Eye,
  MessageSquare,
  Heart,
  Clock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const stats = [
  {
    title: 'Total de Membros',
    value: '524',
    change: '+12%',
    changeType: 'increase',
    icon: Users,
    color: 'from-[#00BFA5] to-emerald-500',
  },
  {
    title: 'Eventos Ativos',
    value: '8',
    change: '+3',
    changeType: 'increase',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Concursos Abertos',
    value: '3',
    change: '0',
    changeType: 'neutral',
    icon: Trophy,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Visitantes (Mês)',
    value: '12.4K',
    change: '+28%',
    changeType: 'increase',
    icon: Eye,
    color: 'from-[#9C27B0] to-purple-500',
  },
];

const recentMembers = [
  { id: 1, name: 'Sofia Rodrigues', email: 'sofia@email.com', status: 'pending', date: '2 horas atrás', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
  { id: 2, name: 'Miguel Ferreira', email: 'miguel@email.com', status: 'pending', date: '5 horas atrás', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  { id: 3, name: 'Beatriz Lopes', email: 'beatriz@email.com', status: 'approved', date: '1 dia atrás', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80' },
  { id: 4, name: 'Tiago Sousa', email: 'tiago@email.com', status: 'pending', date: '1 dia atrás', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80' },
];

const recentMessages = [
  { id: 1, name: 'Ana Santos', subject: 'Dúvida sobre eventos', type: 'contact', time: '30 min' },
  { id: 2, name: 'Carlos Lima', subject: 'Sugestão de melhoria', type: 'suggestion', time: '1 hora' },
  { id: 3, name: 'Marta Costa', subject: 'Problema com inscrição', type: 'complaint', time: '2 horas' },
];

const upcomingEvents = [
  { id: 1, title: 'Gala de Caridade Anual', date: '15 Mar 2024', attendees: 250, max: 300 },
  { id: 2, title: 'Workshop de Liderança', date: '22 Mar 2024', attendees: 45, max: 50 },
  { id: 3, title: 'Corrida Solidária', date: '20 Abr 2024', attendees: 180, max: 500 },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#263238]">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Aqui está o resumo das atividades da associação.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Exportar Relatório</Button>
          <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90">
            Novo Evento
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">{stat.title}</p>
                  <p className="text-3xl font-display font-bold text-[#263238]">{stat.value}</p>
                  <div className={`flex items-center mt-2 text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.changeType === 'increase' && <ArrowUpRight size={16} className="mr-1" />}
                    {stat.changeType === 'decrease' && <ArrowDownRight size={16} className="mr-1" />}
                    <span className="font-semibold">{stat.change}</span>
                    <span className="text-gray-400 ml-1">vs mês anterior</span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Member Requests */}
        <Card className="lg:col-span-2 border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-display font-bold text-[#263238]">
              Solicitações de Membros
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-[#00BFA5]">
              Ver Todos
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 ring-2 ring-white shadow-md">
                      <AvatarImage src={member.image} />
                      <AvatarFallback className="bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#263238]">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge className={`${
                        member.status === 'pending' 
                          ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' 
                          : 'bg-green-100 text-green-700 hover:bg-green-100'
                      }`}>
                        {member.status === 'pending' ? 'Pendente' : 'Aprovado'}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">{member.date}</p>
                    </div>
                    {member.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-[#00BFA5] hover:bg-[#00BFA5]/90 h-8">
                          Aprovar
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                          Rejeitar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="border-none shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-display font-bold text-[#263238]">
              Mensagens Recentes
            </CardTitle>
            <Badge className="bg-[#9C27B0]">12 novas</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    message.type === 'contact' ? 'bg-blue-100 text-blue-600' :
                    message.type === 'suggestion' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#263238] truncate">{message.name}</p>
                    <p className="text-sm text-gray-500 truncate">{message.subject}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{message.time}</span>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-[#00BFA5]">
              Ver Todas as Mensagens
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="border-none shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-display font-bold text-[#263238]">
            Próximos Eventos
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-[#00BFA5]">
            Ver Todos
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => {
              const progress = (event.attendees / event.max) * 100;
              return (
                <div key={event.id} className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-[#263238]">{event.title}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock size={14} className="mr-1" />
                        {event.date}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="h-8">
                      Editar
                    </Button>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Inscrições</span>
                      <span className="font-semibold text-[#263238]">{event.attendees}/{event.max}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00BFA5] to-[#9C27B0] rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: 'Criar Evento', color: 'from-blue-500 to-cyan-500' },
          { icon: Users, label: 'Adicionar Membro', color: 'from-[#00BFA5] to-emerald-500' },
          { icon: Trophy, label: 'Novo Concurso', color: 'from-amber-500 to-orange-500' },
          { icon: Heart, label: 'Enviar Newsletter', color: 'from-[#9C27B0] to-purple-500' },
        ].map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto py-6 flex flex-col gap-3 hover:shadow-lg transition-all duration-300 group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <action.icon className="text-white" size={24} />
            </div>
            <span className="font-medium text-[#263238]">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
