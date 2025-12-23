import { Calendar, MapPin, Users, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const events = [
  {
    id: 1,
    title: 'Gala de Caridade Anual',
    date: '15 de Março, 2024',
    time: '19:00',
    location: 'Centro de Convenções Lisboa',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    category: 'Gala',
    attendees: 250,
    maxAttendees: 300,
    description: 'Junte-se a nós para uma noite especial de celebração e arrecadação de fundos.',
    featured: true,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 2,
    title: 'Workshop de Desenvolvimento Comunitário',
    date: '22 de Março, 2024',
    time: '14:00',
    location: 'Sede The Graces OAC',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'Workshop',
    attendees: 45,
    maxAttendees: 50,
    description: 'Aprenda estratégias práticas para fortalecer sua comunidade local.',
    featured: false,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'Campanha de Doação de Alimentos',
    date: '5 de Abril, 2024',
    time: '10:00',
    location: 'Vários Locais',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    category: 'Campanha',
    attendees: 80,
    maxAttendees: 100,
    description: 'Participe da nossa iniciativa para ajudar famílias necessitadas.',
    featured: false,
    color: 'from-green-500 to-emerald-500',
  },
];

export default function EventsSection() {
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

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.map((event, index) => {
            const progressPercent = (event.attendees / event.maxAttendees) * 100;
            const spotsLeft = event.maxAttendees - event.attendees;
            
            return (
              <Card
                key={event.id}
                className="group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Gradient Border Effect on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ padding: '2px' }}>
                  <div className="w-full h-full bg-white rounded-xl" />
                </div>

                <div className="relative">
                  {/* Image with Overlay */}
                  <div className="relative h-56 overflow-hidden rounded-t-xl">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Badge */}
                    <Badge className={`absolute top-4 left-4 bg-gradient-to-r ${event.color} border-none text-white font-accent shadow-lg`}>
                      {event.category}
                    </Badge>

                    {/* Featured Badge */}
                    {event.featured && (
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
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${event.color} opacity-10 flex items-center justify-center mr-3`}>
                          <Calendar size={14} className="text-gray-700" />
                        </div>
                        <span className="font-medium">{event.date} às {event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${event.color} opacity-10 flex items-center justify-center mr-3`}>
                          <MapPin size={14} className="text-gray-700" />
                        </div>
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-5">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Inscrições</span>
                        <span className="font-semibold">{event.attendees}/{event.maxAttendees}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${event.color} rounded-full transition-all duration-1000 shadow-lg`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <Button 
                      className={`w-full bg-gradient-to-r ${event.color} hover:shadow-lg transition-all duration-300 group/btn border-none`}
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
      </div>
    </section>
  );
}
