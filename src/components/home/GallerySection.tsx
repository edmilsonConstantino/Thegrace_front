import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
    title: 'Evento Comunitário',
    category: 'Eventos',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80',
    title: 'Voluntários em Ação',
    category: 'Voluntariado',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    title: 'Campanha de Doação',
    category: 'Campanhas',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80',
    title: 'Gala Anual',
    category: 'Eventos',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    title: 'Workshop',
    category: 'Educação',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80',
    title: 'Reunião de Membros',
    category: 'Membros',
  },
];

export default function GallerySection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-[#B2DFDB] text-[#00BFA5] rounded-full text-sm font-accent font-medium mb-6">
            Galeria
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
            Momentos que Transformam
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Veja os momentos especiais que marcam nossa jornada de impacto social
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'h-[500px]' : 'h-[250px]'} overflow-hidden`}>
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-block px-3 py-1 bg-[#00BFA5] text-white text-xs font-accent rounded-full mb-2 w-fit">
                    {image.category}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-[#00BFA5] text-[#00BFA5] hover:bg-[#00BFA5] hover:text-white"
            asChild
          >
            <Link to="/galeria">Ver Galeria Completa</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
