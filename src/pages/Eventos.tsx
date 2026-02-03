import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/shared/Chatbot';
import { Calendar, MapPin, Users, Clock, Search, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import eventsService, { Event } from '@/services/events.service';

const categories = ['Todos', 'Gala', 'Workshop', 'Campanha', 'Esporte', 'Festival', 'Reunião'];

export default function Eventos() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [events, setEvents] = useState<Event[]>([]);
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Buscar eventos
  useEffect(() => {
    fetchEvents();
  }, [activeTab, selectedCategory, searchQuery]);

  // Buscar evento em destaque
  useEffect(() => {
    fetchFeaturedEvent();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params: any = {};
      
      if (selectedCategory !== 'Todos') {
        params.category = selectedCategory.toLowerCase();
      }
      
      if (searchQuery) {
        params.search = searchQuery;
      }

      const data = activeTab === 'upcoming' 
        ? await eventsService.getUpcoming(params)
        : await eventsService.getPast(params);
      
      setEvents(data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os eventos. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedEvent = async () => {
    try {
      const data = await eventsService.getFeatured();
      setFeaturedEvent(data);
    } catch (error) {
      console.error('Erro ao buscar evento em destaque:', error);
    }
  };

  const handleRegister = async (eventId: number) => {
    try {
      await eventsService.register(eventId);
      toast({
        title: 'Sucesso!',
        description: 'Você foi inscrito no evento com sucesso.',
      });
      fetchEvents();
      if (featuredEvent?.id === eventId) {
        fetchFeaturedEvent();
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível realizar a inscrição. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9C27B0] via-[#9C27B0]/80 to-[#00BFA5]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Nossos Eventos
              </span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                Conecte-se &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Participe
                </span>
              </h1>
              <p className="text-xl text-white/95 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                Descubra eventos que transformam vidas e fortalecem nossa comunidade
              </p>
            </div>
          </div>
        </section>

        {/* Featured Event */}
        {featuredEvent && (
          <section className="py-12 bg-white relative -mt-16 z-20">
            <div className="container mx-auto px-4 lg:px-8">
              <Card className="border-none shadow-2xl overflow-hidden max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={featuredEvent.image_url || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r" />
                    <Badge className="absolute top-4 left-4 bg-[#9C27B0] hover:bg-[#9C27B0]/90 font-accent text-base px-4 py-1">
                      ⭐ Em Destaque
                    </Badge>
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-[#00BFA5]/10 text-[#00BFA5] hover:bg-[#00BFA5]/20 font-accent">
                      {categories.find(c => c.toLowerCase() === featuredEvent.category) || featuredEvent.category}
                    </Badge>
                    <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#263238] mb-4">
                      {featuredEvent.title}
                    </h2>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredEvent.description}
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-gray-600">
                        <Calendar size={20} className="mr-3 text-[#00BFA5]" />
                        <span>{featuredEvent.formatted_date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={20} className="mr-3 text-[#00BFA5]" />
                        <span>{featuredEvent.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={20} className="mr-3 text-[#00BFA5]" />
                        <span>{featuredEvent.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users size={20} className="mr-3 text-[#00BFA5]" />
                        <span>{featuredEvent.attendees}/{featuredEvent.max_attendees} participantes</span>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-[#00BFA5] hover:bg-[#00BFA5]/90 w-fit group"
                      onClick={() => handleRegister(featuredEvent.id)}
                    >
                      Inscrever-se Agora
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Events List */}
        <section className="py-20 lg:py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Filters */}
            <div className="mb-12">
              <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                {/* Search */}
                <div className="relative w-full lg:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Buscar eventos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 rounded-full border-gray-200 focus:ring-[#00BFA5]"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? 'bg-[#00BFA5] hover:bg-[#00BFA5]/90 rounded-full'
                          : 'rounded-full hover:border-[#00BFA5] hover:text-[#00BFA5]'
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'upcoming' | 'past')} className="w-full">
              <TabsList className="mb-8 bg-white shadow-md rounded-full p-1 w-fit mx-auto">
                <TabsTrigger 
                  value="upcoming" 
                  className="rounded-full px-8 data-[state=active]:bg-[#00BFA5] data-[state=active]:text-white"
                >
                  Próximos Eventos
                </TabsTrigger>
                <TabsTrigger 
                  value="past"
                  className="rounded-full px-8 data-[state=active]:bg-[#00BFA5] data-[state=active]:text-white"
                >
                  Eventos Passados
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-0">
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-[#00BFA5]" />
                  </div>
                ) : events.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} onRegister={handleRegister} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">Nenhum evento encontrado com os filtros selecionados.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-0">
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-[#00BFA5]" />
                  </div>
                ) : events.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} isPast />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">Nenhum evento passado encontrado.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

interface EventCardProps {
  event: Event;
  isPast?: boolean;
  onRegister?: (eventId: number) => void;
}

function EventCard({ event, isPast, onRegister }: EventCardProps) {
  const categoryLabel = categories.find(c => c.toLowerCase() === event.category) || event.category;
  
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={event.image_url || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80'}
          alt={event.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${isPast ? 'grayscale' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-[#9C27B0] hover:bg-[#9C27B0]/90 font-accent">
          {categoryLabel}
        </Badge>
        {isPast && (
          <Badge className="absolute top-4 right-4 bg-gray-500 hover:bg-gray-500/90 font-accent">
            Encerrado
          </Badge>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="font-display font-bold text-xl text-[#263238] mb-3 line-clamp-2 group-hover:text-[#00BFA5] transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2 text-[#00BFA5]" />
            <span>{event.formatted_date} às {event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2 text-[#00BFA5]" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {!isPast && (
          <>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Inscritos</span>
                <span className="font-semibold text-[#263238]">{event.attendees}/{event.max_attendees}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00BFA5] to-[#9C27B0] rounded-full transition-all duration-500"
                  style={{ width: `${event.progress_percent}%` }}
                />
              </div>
            </div>

            <Button 
              className="w-full bg-[#00BFA5] hover:bg-[#00BFA5]/90 group"
              onClick={() => onRegister?.(event.id)}
            >
              Inscrever-se
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </>
        )}

        {isPast && (
          <Button variant="outline" className="w-full border-gray-300 text-gray-600">
            Ver Galeria
          </Button>
        )}
      </CardContent>
    </Card>
  );
}