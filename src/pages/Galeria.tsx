import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/shared/Chatbot';
import { X, ChevronLeft, ChevronRight, Play, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const galleryItems = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80',
    title: 'Evento Comunitário 2024',
    category: 'Eventos',
    type: 'image',
    date: '15 Jan 2024',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80',
    title: 'Voluntários em Ação',
    category: 'Voluntariado',
    type: 'image',
    date: '10 Jan 2024',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
    title: 'Campanha de Doação',
    category: 'Campanhas',
    type: 'image',
    date: '05 Jan 2024',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80',
    title: 'Gala Anual 2023',
    category: 'Eventos',
    type: 'image',
    date: '20 Dec 2023',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    title: 'Workshop de Liderança',
    category: 'Educação',
    type: 'image',
    date: '15 Dec 2023',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&q=80',
    title: 'Reunião de Membros',
    category: 'Membros',
    type: 'image',
    date: '10 Dec 2023',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&q=80',
    title: 'Celebração Comunitária',
    category: 'Eventos',
    type: 'image',
    date: '01 Dec 2023',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80',
    title: 'Equipe de Voluntários',
    category: 'Voluntariado',
    type: 'image',
    date: '25 Nov 2023',
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
    title: 'Palestra Motivacional',
    category: 'Educação',
    type: 'image',
    date: '20 Nov 2023',
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&q=80',
    title: 'Família Graces',
    category: 'Membros',
    type: 'image',
    date: '15 Nov 2023',
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80',
    title: 'Ação Solidária',
    category: 'Campanhas',
    type: 'image',
    date: '10 Nov 2023',
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80',
    title: 'Festival Cultural',
    category: 'Eventos',
    type: 'image',
    date: '05 Nov 2023',
  },
];

const categories = ['Todos', 'Eventos', 'Voluntariado', 'Campanhas', 'Educação', 'Membros'];

export default function Galeria() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'Todos' || item.category === selectedCategory
  );

  const openLightbox = (item: typeof galleryItems[0], index: number) => {
    setSelectedImage(item);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5] via-teal-500 to-[#9C27B0]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Nossa Galeria
              </span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                Momentos que{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Inspiram
                </span>
              </h1>
              <p className="text-xl text-white/95 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                Reviva os momentos especiais que marcam nossa jornada de transformação
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 lg:py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? 'bg-[#00BFA5] hover:bg-[#00BFA5]/90 rounded-full px-6'
                      : 'rounded-full px-6 hover:border-[#00BFA5] hover:text-[#00BFA5]'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(item, index)}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    index % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                  }`}
                >
                  <div className={`relative ${index % 5 === 0 ? 'h-[500px]' : 'h-[280px]'} overflow-hidden`}>
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Badge className="w-fit mb-2 bg-[#00BFA5] hover:bg-[#00BFA5]/90 font-accent">
                        {item.category}
                      </Badge>
                      <h3 className="font-display font-bold text-xl text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm">{item.date}</p>
                    </div>

                    {/* Play button for videos */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="text-[#00BFA5] ml-1" size={24} fill="currentColor" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
          <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black/95 border-none">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Navigation */}
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>

              {/* Image */}
              {selectedImage && (
                <div className="relative max-w-full max-h-full p-8">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  />
                  
                  {/* Info bar */}
                  <div className="absolute bottom-0 left-8 right-8 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="mb-2 bg-[#00BFA5] hover:bg-[#00BFA5]/90 font-accent">
                          {selectedImage.category}
                        </Badge>
                        <h3 className="font-display font-bold text-2xl text-white">
                          {selectedImage.title}
                        </h3>
                        <p className="text-white/70">{selectedImage.date}</p>
                      </div>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Download className="mr-2" size={18} />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Thumbnail strip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-full">
                {filteredItems.slice(0, 8).map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => openLightbox(item, index)}
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                      currentIndex === index ? 'border-[#00BFA5] scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={item.thumb} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
