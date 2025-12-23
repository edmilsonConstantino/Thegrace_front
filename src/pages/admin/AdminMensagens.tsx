import { useState } from 'react';
import { 
  Search,
  MoreVertical,
  Star,
  Trash2,
  Archive,
  Reply,
  MessageSquare,
  Lightbulb,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Mail,
  MailOpen,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

const messages = [
  {
    id: 1,
    name: 'Ana Santos',
    email: 'ana.santos@email.com',
    subject: 'Dúvida sobre inscrição em eventos',
    message: 'Olá, gostaria de saber como posso me inscrever nos próximos eventos da associação. Tentei pelo site mas não encontrei o botão de inscrição...',
    type: 'contact',
    status: 'unread',
    starred: false,
    date: '2024-02-15T10:30:00',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    id: 2,
    name: 'Carlos Lima',
    email: 'carlos.lima@email.com',
    subject: 'Sugestão de melhoria no portal',
    message: 'Tenho uma sugestão para melhorar a experiência do usuário no portal. Seria interessante adicionar um calendário interativo...',
    type: 'suggestion',
    status: 'unread',
    starred: true,
    date: '2024-02-15T09:15:00',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: 3,
    name: 'Marta Costa',
    email: 'marta.costa@email.com',
    subject: 'Problema com pagamento de doação',
    message: 'Estou tentando fazer uma doação mas o sistema está apresentando erro. Já tentei várias vezes e não consigo finalizar...',
    type: 'complaint',
    status: 'read',
    starred: false,
    date: '2024-02-14T16:45:00',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    id: 4,
    name: 'Ricardo Ferreira',
    email: 'ricardo.ferreira@email.com',
    subject: 'Parceria para evento beneficente',
    message: 'Represento uma empresa que gostaria de propor uma parceria para o próximo evento beneficente da associação...',
    type: 'contact',
    status: 'read',
    starred: true,
    date: '2024-02-14T14:20:00',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
  {
    id: 5,
    name: 'Beatriz Almeida',
    email: 'beatriz.almeida@email.com',
    subject: 'Voluntariado - Como participar',
    message: 'Gostaria de me voluntariar para as atividades da associação. Quais são os próximos passos para começar?',
    type: 'contact',
    status: 'replied',
    starred: false,
    date: '2024-02-13T11:00:00',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
];

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'contact':
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100"><MessageSquare className="w-3 h-3 mr-1" />Contato</Badge>;
    case 'suggestion':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100"><Lightbulb className="w-3 h-3 mr-1" />Sugestão</Badge>;
    case 'complaint':
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100"><AlertTriangle className="w-3 h-3 mr-1" />Reclamação</Badge>;
    default:
      return null;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'unread':
      return <Badge variant="outline" className="border-amber-500 text-amber-600"><Clock className="w-3 h-3 mr-1" />Não lido</Badge>;
    case 'read':
      return <Badge variant="outline" className="border-gray-400 text-gray-500"><MailOpen className="w-3 h-3 mr-1" />Lido</Badge>;
    case 'replied':
      return <Badge variant="outline" className="border-green-500 text-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />Respondido</Badge>;
    default:
      return null;
  }
};

export default function AdminMensagens() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'unread' && msg.status === 'unread') ||
      (activeTab === 'starred' && msg.starred) ||
      activeTab === msg.type;
    return matchesSearch && matchesTab;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#263238]">
            Mensagens
          </h1>
          <p className="text-gray-500 mt-1">
            Gerencie as mensagens recebidas pelo portal.
          </p>
        </div>
        <Badge className="bg-[#9C27B0] text-white text-base px-4 py-1">
          <Mail className="w-4 h-4 mr-2" />
          12 não lidas
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: '156', color: 'from-[#00BFA5] to-emerald-500', icon: MessageSquare },
          { label: 'Contatos', value: '89', color: 'from-blue-500 to-cyan-500', icon: MessageSquare },
          { label: 'Sugestões', value: '42', color: 'from-green-500 to-emerald-500', icon: Lightbulb },
          { label: 'Reclamações', value: '25', color: 'from-red-500 to-rose-500', icon: AlertTriangle },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filters */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Buscar mensagens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="all" className="text-xs">Todas</TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs">Não lidas</TabsTrigger>
                  <TabsTrigger value="starred" className="text-xs">Marcadas</TabsTrigger>
                  <TabsTrigger value="complaint" className="text-xs">Urgentes</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-0 max-h-[600px] overflow-y-auto">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-[#00BFA5]/5 border-l-4 border-l-[#00BFA5]' : ''
                  } ${msg.status === 'unread' ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={msg.image} />
                      <AvatarFallback className="bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] text-white text-sm">
                        {msg.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium truncate ${msg.status === 'unread' ? 'text-[#263238]' : 'text-gray-600'}`}>
                          {msg.name}
                        </p>
                        <span className="text-xs text-gray-400">{formatDate(msg.date)}</span>
                      </div>
                      <p className={`text-sm truncate ${msg.status === 'unread' ? 'font-medium text-[#263238]' : 'text-gray-500'}`}>
                        {msg.subject}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {getTypeBadge(msg.type)}
                        {msg.starred && <Star className="w-4 h-4 text-amber-500" fill="currentColor" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Message Detail */}
        <Card className="lg:col-span-2 border-none shadow-lg">
          <CardContent className="p-6">
            {selectedMessage ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={selectedMessage.image} />
                      <AvatarFallback className="bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] text-white text-lg">
                        {selectedMessage.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-display font-bold text-xl text-[#263238]">
                        {selectedMessage.name}
                      </h3>
                      <p className="text-gray-500">{selectedMessage.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {getTypeBadge(selectedMessage.type)}
                        {getStatusBadge(selectedMessage.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {}}
                    >
                      <Star 
                        className={selectedMessage.starred ? 'text-amber-500' : 'text-gray-400'} 
                        fill={selectedMessage.starred ? 'currentColor' : 'none'}
                        size={20}
                      />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Archive className="mr-2" size={14} />
                          Arquivar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2" size={14} />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <h2 className="font-display font-bold text-2xl text-[#263238]">
                    {selectedMessage.subject}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(selectedMessage.date).toLocaleString('pt-PT')}
                  </p>
                </div>

                {/* Message Content */}
                <div className="p-6 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Reply */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#263238]">Responder</h4>
                  <Textarea
                    placeholder="Escreva sua resposta..."
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Salvar Rascunho</Button>
                    <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90">
                      <Reply className="mr-2" size={16} />
                      Enviar Resposta
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[500px] flex items-center justify-center text-center">
                <div>
                  <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Selecione uma mensagem para visualizar</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
