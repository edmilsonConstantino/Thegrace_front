import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Search,
  Upload,
  Image as ImageIcon,
  Video,
  FileText,
  Grid,
  List,
  MoreVertical,
  Download,
  Eye,
  Tag,
  FolderOpen,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mediaItems = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80',
    title: 'Evento Comunitário 2024',
    type: 'image',
    category: 'Eventos',
    size: '2.4 MB',
    date: '15 Jan 2024',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80',
    title: 'Voluntários em Ação',
    type: 'image',
    category: 'Voluntariado',
    size: '1.8 MB',
    date: '10 Jan 2024',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
    title: 'Campanha de Doação',
    type: 'image',
    category: 'Campanhas',
    size: '3.2 MB',
    date: '05 Jan 2024',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
    title: 'Gala Anual 2023',
    type: 'image',
    category: 'Eventos',
    size: '4.1 MB',
    date: '20 Dez 2023',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    title: 'Workshop de Liderança',
    type: 'image',
    category: 'Educação',
    size: '2.7 MB',
    date: '15 Dez 2023',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&q=80',
    title: 'Reunião de Membros',
    type: 'image',
    category: 'Membros',
    size: '1.5 MB',
    date: '10 Dez 2023',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&q=80',
    title: 'Celebração Comunitária',
    type: 'image',
    category: 'Eventos',
    size: '3.8 MB',
    date: '01 Dez 2023',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80',
    title: 'Equipe de Voluntários',
    type: 'image',
    category: 'Voluntariado',
    size: '2.2 MB',
    date: '25 Nov 2023',
  },
];

const categories = ['Todos', 'Eventos', 'Voluntariado', 'Campanhas', 'Educação', 'Membros'];

export default function AdminGaleria() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#263238]">
            Galeria de Mídia
          </h1>
          <p className="text-gray-500 mt-1">
            Gerencie as imagens, vídeos e documentos da associação.
          </p>
        </div>
        <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90">
          <Upload className="mr-2" size={18} />
          Upload de Arquivos
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total de Arquivos', value: '847', color: 'from-[#00BFA5] to-emerald-500', icon: FolderOpen },
          { label: 'Imagens', value: '654', color: 'from-blue-500 to-cyan-500', icon: ImageIcon },
          { label: 'Vídeos', value: '42', color: 'from-[#9C27B0] to-purple-500', icon: Video },
          { label: 'Documentos', value: '151', color: 'from-amber-500 to-orange-500', icon: FileText },
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
                placeholder="Buscar arquivos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-[#00BFA5] hover:bg-[#00BFA5]/90' : ''}
              >
                <Grid size={18} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-[#00BFA5] hover:bg-[#00BFA5]/90' : ''}
              >
                <List size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-[#00BFA5]/10 rounded-xl border border-[#00BFA5]/20">
          <span className="text-sm font-medium text-[#00BFA5]">
            {selectedItems.length} arquivo(s) selecionado(s)
          </span>
          <div className="flex-1" />
          <Button size="sm" variant="outline">
            <Download className="mr-2" size={14} />
            Baixar
          </Button>
          <Button size="sm" variant="outline">
            <Tag className="mr-2" size={14} />
            Categorizar
          </Button>
          <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            <Trash2 className="mr-2" size={14} />
            Excluir
          </Button>
        </div>
      )}

      {/* Media Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                selectedItems.includes(item.id) ? 'ring-2 ring-[#00BFA5]' : ''
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => toggleItemSelection(item.id)}
                    className="bg-white/90"
                  />
                </div>

                {/* Category Badge */}
                <Badge className="absolute top-2 right-2 bg-white/90 text-gray-700 text-xs">
                  {item.category}
                </Badge>

                {/* Overlay Content */}
                <div className="absolute inset-x-0 bottom-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium truncate">{item.title}</p>
                  <p className="text-white/70 text-xs">{item.size}</p>
                </div>

                {/* Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/90 hover:bg-white">
                        <MoreVertical size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2" size={14} />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2" size={14} />
                        Baixar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Tag className="mr-2" size={14} />
                        Editar Tags
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2" size={14} />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card className="border-none shadow-lg">
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="w-12 p-4">
                    <Checkbox />
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Arquivo</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Categoria</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Tamanho</th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">Data</th>
                  <th className="text-right p-4 font-semibold text-gray-600 text-sm">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="font-medium text-[#263238]">{item.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{item.category}</Badge>
                    </td>
                    <td className="p-4 text-gray-600">{item.size}</td>
                    <td className="p-4 text-gray-600">{item.date}</td>
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
                            <Download className="mr-2" size={14} />
                            Baixar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2" size={14} />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
