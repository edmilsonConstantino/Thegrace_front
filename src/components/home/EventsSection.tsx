import { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, Sparkles, Loader2, CalendarOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import eventsService, { type Event } from '@/services/events.service';

// Mapeamento de cores por categoria
const categoryColors: Record<string, string> = {
  gala: 'from-amber-500 to-orange-500',
  workshop: 'from-blue-500 to-cyan-500',
  campanha: 'from-green-500 to-emerald-500',
  esporte: 'from-red-500 to-pink-500',
  festival: 'from-purple-500 to-indigo-500',
  reunião: 'from-teal-500 to-cyan-500',
  default: 'from-[#9C27B0] to-[#00BFA5]',
};

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Buscar apenas os próximos 3 eventos para a home
      const data = await eventsService.getUpcoming();
      setEvents(data.slice(0, 3));
    } catch (err: any) {
      console.error('Erro ao carregar eventos:', err);
      setError(err?.message || 'Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string): string => {
    return categoryColors[category?.toLowerCase()] || categoryColors.default;
  };

  return (
    <section className="py-24 lg:py-36 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00BFA5]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9C27B0]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-[#E1BEE7]/50 text-[#9C27B0] rounded-full text-sm font-accent font-medium mb-6 border border-[#9C27B0]/20">
            <Sparkles className="mr-2 w-4 h-4" />
            Próximos Eventos
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-6xl text-[#263238] mb-6 leading-[1.1]">
            Participe dos Nossos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9C27B0] to-[#00BFA5]">
              Eventos
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Conecte-se com a comunidade e faça parte de iniciativas que transformam vidas
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#00BFA5] mb-4" />
            <p className="text-gray-500 text-lg">Carregando eventos...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarOff className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-display font-bold text-xl text-red-900 mb-2">
                Erro ao Carregar Eventos
              </h3>
              <p className="text-red-700 mb-4">{error}</p>
              <Button
                onClick={loadEvents}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Tentar Novamente
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#9C27B0]/10 to-[#00BFA5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarOff className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[#263238] mb-3">
                Nenhum Evento Disponível
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                No momento não temos eventos agendados. Estamos a preparar experiências incríveis para você!
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Volte em breve ou entre em contacto connosco para saber mais sobre as nossas próximas iniciativas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="border-[#00BFA5] text-[#00BFA5] hover:bg-[#00BFA5]/10"
                  asChild
                >
                  <Link to="/contato">
                    Entrar em Contacto
                  </Link>
                </Button>
                <Button
                  onClick={loadEvents}
                  className="bg-gradient-to-r from-[#9C27B0] to-[#00BFA5] hover:from-[#9C27B0]/90 hover:to-[#00BFA5]/90"
                >
                  Atualizar Página
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {events.map((event, index) => {
                const progressPercent = (event.attendees / event.max_attendees) * 100;
                const spotsLeft = event.max_attendees - event.attendees;
                const color = getCategoryColor(event.category);
                
                return (
                  <Card
                    key={event.id}
                    className="group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Gradient Border Effect on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ padding: '2px' }}>
                      <div className="w-full h-full bg-white rounded-xl" />
                    </div>

                    <div className="relative">
                      {/* Image with Overlay */}
                      <div className="relative h-56 overflow-hidden rounded-t-xl">
                        <img
                          src={event.image_url || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        
                        {/* Badge */}
                        <Badge className={`absolute top-4 left-4 bg-gradient-to-r ${color} border-none text-white font-accent shadow-lg capitalize`}>
                          {event.category}
                        </Badge>

                        {/* Featured Badge */}
                        {event.is_featured && (
                          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-amber-600 px-3 py-1 rounded-full text-xs font-bold">
                            <Sparkles className="w-3 h-3" fill="currentColor" />
                            Destaque
                          </div>
                        )}

                        {/* Spots Left */}
                        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs font-bold text-[#263238]">{spotsLeft} vagas</span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="font-display font-bold text-xl text-[#263238] mb-3 line-clamp-2 group-hover:text-[#00BFA5] transition-colors duration-300">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="space-y-3 mb-5">
                          <div className="flex items-center text-sm text-gray-600">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} opacity-10 flex items-center justify-center mr-3`}>
                              <Calendar size={14} className="text-gray-700" />
                            </div>
                            <span className="font-medium">{event.formatted_date} às {event.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} opacity-10 flex items-center justify-center mr-3`}>
                              <MapPin size={14} className="text-gray-700" />
                            </div>
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-5">
                          <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>Inscrições</span>
                            <span className="font-semibold">{event.attendees}/{event.max_attendees}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 shadow-lg`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>

                        <Button 
                          className={`w-full bg-gradient-to-r ${color} hover:shadow-lg transition-all duration-300 group/btn border-none`}
                          asChild
                        >
                          <Link to={`/eventos/${event.id}`}>
                            Ver Detalhes
                            <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#9C27B0] to-[#00BFA5] hover:from-[#9C27B0] hover:to-teal-500 text-white shadow-xl shadow-[#9C27B0]/30 hover:shadow-2xl hover:shadow-[#9C27B0]/40 transition-all duration-300 px-10 group"
                asChild
              >
                <Link to="/eventos">
                  Ver Todos os Eventos
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}