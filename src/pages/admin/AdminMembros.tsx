import { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  UserCheck,
  UserX,
  Download,
  Upload
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const members = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '+351 912 345 678',
    role: 'Presidente',
    status: 'active',
    joinDate: '15 Jan 2020',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao.santos@email.com',
    phone: '+351 923 456 789',
    role: 'Vice-Presidente',
    status: 'active',
    joinDate: '20 Mar 2020',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: 3,
    name: 'Sofia Rodrigues',
    email: 'sofia.rodrigues@email.com',
    phone: '+351 934 567 890',
    role: 'Membro',
    status: 'pending',
    joinDate: 'Pendente',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
  {
    id: 4,
    name: 'Miguel Ferreira',
    email: 'miguel.ferreira@email.com',
    phone: '+351 945 678 901',
    role: 'Membro',
    status: 'pending',
    joinDate: 'Pendente',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  {
    id: 5,
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '+351 956 789 012',
    role: 'Coordenadora',
    status: 'active',
    joinDate: '10 Jun 2021',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    id: 6,
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
    phone: '+351 967 890 123',
    role: 'Tesoureiro',
    status: 'inactive',
    joinDate: '05 Set 2021',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Ativo</Badge>;
    case 'pending':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pendente</Badge>;
    case 'inactive':
      return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Inativo</Badge>;
    default:
      return null;
  }
};

export default function AdminMembros() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const filteredMembers = members.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || member.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const toggleMemberSelection = (id: number) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(m => m.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#263238]">
            Gerenciar Membros
          </h1>
          <p className="text-gray-500 mt-1">
            Gerencie os membros da associação.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2" size={16} />
            Exportar
          </Button>
          <Button variant="outline">
            <Upload className="mr-2" size={16} />
            Importar
          </Button>
          <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90">
            <Plus className="mr-2" size={18} />
            Novo Membro
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Membros', value: '524', color: 'from-[#00BFA5] to-emerald-500', icon: UserCheck },
          { label: 'Membros Ativos', value: '498', color: 'from-green-500 to-emerald-500', icon: CheckCircle2 },
          { label: 'Pendentes', value: '18', color: 'from-amber-500 to-orange-500', icon: MoreVertical },
          { label: 'Inativos', value: '8', color: 'from-gray-500 to-gray-600', icon: UserX },
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
                placeholder="Buscar membros..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Ativos</TabsTrigger>
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
                <TabsTrigger value="inactive">Inativos</TabsTrigger>
              </TabsList>
            </Tabs>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="presidente">Presidente</SelectItem>
                <SelectItem value="vice">Vice-Presidente</SelectItem>
                <SelectItem value="coordenador">Coordenador</SelectItem>
                <SelectItem value="membro">Membro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedMembers.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-[#00BFA5]/10 rounded-xl border border-[#00BFA5]/20">
          <span className="text-sm font-medium text-[#00BFA5]">
            {selectedMembers.length} membro(s) selecionado(s)
          </span>
          <div className="flex-1" />
          <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
            <CheckCircle2 className="mr-2" size={14} />
            Aprovar
          </Button>
          <Button size="sm" variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-50">
            <Mail className="mr-2" size={14} />
            Enviar Email
          </Button>
          <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            <XCircle className="mr-2" size={14} />
            Rejeitar
          </Button>
        </div>
      )}

      {/* Members Table */}
      <Card className="border-none shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="w-12 p-4">
                    <Checkbox 
                      checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                      onCheckedChange={toggleAllSelection}
                    />
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Membro</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Contato</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Cargo</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Membro Desde</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Status</th>
                  <th className="text-right p-4 font-semibold text-gray-600 text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <Checkbox 
                        checked={selectedMembers.includes(member.id)}
                        onCheckedChange={() => toggleMemberSelection(member.id)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 ring-2 ring-white shadow-md">
                          <AvatarImage src={member.image} />
                          <AvatarFallback className="bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-[#263238]">{member.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Mail size={14} className="mr-2 text-gray-400" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <Phone size={14} className="mr-2 text-gray-400" />
                        {member.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{member.role}</Badge>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">
                      {member.joinDate}
                    </td>
                    <td className="p-4">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="p-4 text-right">
                      {member.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 h-8">
                            <CheckCircle2 size={14} className="mr-1" />
                            Aprovar
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                            <XCircle size={14} />
                          </Button>
                        </div>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2" size={14} />
                              Ver Perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit2 className="mr-2" size={14} />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2" size={14} />
                              Enviar Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2" size={14} />
                              Remover
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
