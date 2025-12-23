import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Eye, Heart, ArrowRight, Play, Image as ImageIcon } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    title: 'Evento Comunitário 2024',
    category: 'Eventos',
    views: 1240,
    likes: 89,
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    title: 'Voluntários em Ação',
    category: 'Voluntariado',
    views: 856,
    likes: 67,
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    title: 'Campanha de Doação',
    category: 'Campanhas',
    views: 2100,
    likes: 134,
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    title: 'Gala Anual 2023',
    category: 'Eventos',
    views: 3450,
    likes: 234,
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    title: 'Workshop de Liderança',
    category: 'Educação',
    views: 1678,
    likes: 92,
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
    title: 'Reunião de Membros',
    category: 'Membros',
    views: 945,
    likes: 54,
  },
];

export default function GallerySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-36 bg-gradient-to-br from-gray-900 via-[#263238] to-gray-900 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #00BFA5 1px, transparent 1px), linear-gradient(to bottom, #00BFA5 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00BFA5]/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9C27B0]/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-6 border border-white/20">
            <ImageIcon className="mr-2 w-4 h-4" />
            Galeria
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-6xl text-white mb-6 leading-[1.1]">
            Momentos que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA5] via-teal-400 to-[#9C27B0]">
              Transformam
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
            Veja os momentos especiais que marcam nossa jornada de impacto social
          </p>
        </div>

        {/* Gallery Grid with Bento Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {galleryImages.map((image, index) => {
            const isLarge = index === 0;
            const isMedium = index === 3;
            
            return (
              <div
                key={image.id}
                onMouseEnter={() => setHoveredId(image.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                  isLarge ? 'sm:col-span-2 sm:row-span-2' : 
                  isMedium ? 'sm:col-span-2' : ''
                }`}
              >
                <div className={`relative ${
                  isLarge ? 'h-[500px]' : 
                  isMedium ? 'h-[280px]' : 
                  'h-[240px]'
                } overflow-hidden`}>
                  {/* Image */}
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                    hoveredId === image.id 
                      ? 'from-black/90 via-black/50 to-transparent opacity-100' 
                      : 'from-black/60 via-transparent to-transparent opacity-100'
                  }`} />

                  {/* Animated Border */}
                  <div className={`absolute inset-0 border-2 border-[#00BFA5]/0 transition-all duration-500 rounded-2xl ${
                    hoveredId === image.id ? 'border-[#00BFA5]/50' : ''
                  }`} />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-accent rounded-full border border-white/30">
                      {image.category}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className={`absolute top-4 right-4 flex items-center gap-3 transition-all duration-500 ${
                    hoveredId === image.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                      <Eye className="w-3 h-3 text-white" />
                      <span className="text-white text-xs font-semibold">{image.views}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                      <Heart className="w-3 h-3 text-white" fill="white" />
                      <span className="text-white text-xs font-semibold">{image.likes}</span>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className={`transform transition-all duration-500 ${
                      hoveredId === image.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      <h3 className="font-display font-bold text-xl lg:text-2xl text-white mb-2">
                        {image.title}
                      </h3>
                      <Button 
                        size="sm" 
                        className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border border-white/30 rounded-full"
                      >
                        <Play className="w-3 h-3 mr-2" fill="white" />
                        Ver Mais
                      </Button>
                    </div>
                  </div>

                  {/* Hover Icon */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    hoveredId === image.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}>
                    <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border-2 border-white/50 flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-white text-[#263238] hover:bg-white/90 shadow-2xl hover:shadow-white/20 transition-all duration-300 px-10 group"
            asChild
          >
            <Link to="/galeria">
              Ver Galeria Completa
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
