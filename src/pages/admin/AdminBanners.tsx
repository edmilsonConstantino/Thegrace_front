import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Calendar, GripVertical, Image as ImageIcon, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const banners = [
  {
    id: 1,
    title: 'Juntos Fazemos a Diferença',
    subtitle: 'Transformando vidas através da caridade',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    cta: 'Seja Membro',
    ctaLink: '/registrar',
    active: true,
    order: 1,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: 2,
    title: 'Participe dos Nossos Eventos',
    subtitle: 'Conecte-se com a comunidade',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    cta: 'Ver Eventos',
    ctaLink: '/eventos',
    active: true,
    order: 2,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  },
  {
    id: 3,
    title: 'Apoie Nossa Missão',
    subtitle: 'Sua contribuição transforma vidas',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    cta: 'Doe Agora',
    ctaLink: '/contato',
    active: false,
    order: 3,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
  },
];

export default function AdminBanners() {
  const [bannersList, setBannersList] = useState(banners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleBanner = (id: number) => {
    setBannersList(prev => 
      prev.map(b => b.id === id ? { ...b, active: !b.active } : b)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl text-[#263238]">
            Gerenciar Banners
          </h1>
          <p className="text-gray-500 mt-1">
            Configure os slides do banner principal do site.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90">
              <Plus className="mr-2" size={18} />
              Novo Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Criar Novo Banner</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Imagem do Banner</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#00BFA5] transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600">Arraste uma imagem ou clique para selecionar</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG até 10MB (1920x800 recomendado)</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input id="title" placeholder="Ex: Juntos Fazemos a Diferença" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cta">Texto do Botão</Label>
                  <Input id="cta" placeholder="Ex: Seja Membro" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Textarea id="subtitle" placeholder="Descrição curta do banner" rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="link">Link do Botão</Label>
                  <Input id="link" placeholder="/registrar" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Ordem</Label>
                  <Input id="order" type="number" placeholder="1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data de Fim</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90">
                  Criar Banner
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Banners List */}
      <div className="space-y-4">
        {bannersList.map((banner, index) => (
          <Card key={banner.id} className="border-none shadow-lg overflow-hidden">
            <div className="flex">
              {/* Drag Handle */}
              <div className="w-12 bg-gray-50 flex items-center justify-center cursor-move hover:bg-gray-100 transition-colors">
                <GripVertical className="text-gray-400" size={20} />
              </div>
              
              {/* Preview Image */}
              <div className="w-64 h-36 relative overflow-hidden">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <Badge className={`${banner.active ? 'bg-green-500' : 'bg-gray-500'}`}>
                    #{banner.order}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="flex-1 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg text-[#263238]">
                      {banner.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{banner.subtitle}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {banner.startDate} - {banner.endDate}
                      </div>
                      <Badge variant="outline" className="text-[#00BFA5] border-[#00BFA5]">
                        {banner.cta} → {banner.ctaLink}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 mr-4">
                      <span className="text-sm text-gray-500">
                        {banner.active ? 'Ativo' : 'Inativo'}
                      </span>
                      <Switch 
                        checked={banner.active}
                        onCheckedChange={() => toggleBanner(banner.id)}
                      />
                    </div>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Eye size={16} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Preview Section */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Eye className="text-[#00BFA5]" size={20} />
            Preview do Banner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img 
              src={bannersList[0].image}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#00BFA5]/90 via-[#00BFA5]/70 to-[#9C27B0]/70" />
            <div className="absolute inset-0 flex items-center px-12">
              <div className="max-w-2xl">
                <h2 className="font-display font-extrabold text-4xl text-white mb-3">
                  {bannersList[0].title}
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  {bannersList[0].subtitle}
                </p>
                <Button className="bg-white text-[#00BFA5] hover:bg-white/90">
                  {bannersList[0].cta}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
