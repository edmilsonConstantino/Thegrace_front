import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
    title: 'Juntos Fazemos a',
    highlight: 'Diferença',
    subtitle: 'Transformando vidas através da caridade e ação comunitária há mais de 9 anos',
    cta: 'Seja Membro',
    ctaLink: '/registrar',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80',
    title: 'Participe dos Nossos',
    highlight: 'Eventos',
    subtitle: 'Conecte-se com a comunidade e faça parte de algo maior que você',
    cta: 'Ver Eventos',
    ctaLink: '/eventos',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80',
    title: 'Apoie Nossa',
    highlight: 'Missão',
    subtitle: 'Cada contribuição ajuda a transformar vidas e construir um futuro melhor',
    cta: 'Doe Agora',
    ctaLink: '/contato',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(true);
      }, 100);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(true);
      }, 100);
    }
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[700px] md:h-[750px] lg:h-[850px] overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image with Ken Burns effect */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear ${
              index === currentSlide ? 'scale-110' : 'scale-100'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Mesh Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5]/95 via-[#00BFA5]/75 to-[#9C27B0]/80" />
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')]" />
        </div>
      ))}

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#9C27B0]/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 lg:px-8 flex items-center">
        <div className="max-w-4xl">
          {/* Badge */}
          <div 
            className={`transition-all duration-700 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="inline-flex items-center px-4 py-2 bg-white/15 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-8 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              +500 membros ativos
            </span>
          </div>

          {/* Title */}
          <h1 
            className={`font-display font-extrabold text-5xl md:text-6xl lg:text-8xl text-white mb-6 leading-[1.1] transition-all duration-700 delay-100 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {slides[currentSlide].title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#E1BEE7]">
              {slides[currentSlide].highlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl lg:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              size="lg"
              className="bg-white text-[#00BFA5] hover:bg-white/95 hover:scale-105 text-lg px-10 py-7 h-auto font-bold shadow-2xl shadow-black/20 transition-all duration-300 group"
              asChild
            >
              <Link to={slides[currentSlide].ctaLink}>
                {slides[currentSlide].cta}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-[#00BFA5] hover:scale-105 text-lg px-10 py-7 h-auto font-bold backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link to="/sobre">Saiba Mais</Link>
            </Button>
          </div>

          {/* Stats Row */}
          <div 
            className={`flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20 transition-all duration-700 delay-500 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-white">150+</div>
              <div className="text-white/70 text-sm">Eventos Realizados</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-white">10K+</div>
              <div className="text-white/70 text-sm">Vidas Impactadas</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-white">9</div>
              <div className="text-white/70 text-sm">Anos de Atuação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-300 z-10 group"
      >
        <ChevronLeft className="text-white group-hover:-translate-x-0.5 transition-transform" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:scale-110 flex items-center justify-center transition-all duration-300 z-10 group"
      >
        <ChevronRight className="text-white group-hover:translate-x-0.5 transition-transform" size={24} />
      </button>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative h-3 flex items-center"
          >
            <div className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'w-12 bg-white' : 'w-3 bg-white/40 group-hover:bg-white/60'
            }`}>
              {index === currentSlide && (
                <div className="absolute inset-0 bg-white/50 rounded-full animate-pulse" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center text-white/60 animate-bounce">
        <span className="text-xs font-accent mb-2 rotate-90 origin-center">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
