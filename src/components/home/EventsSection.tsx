import { Calendar, MapPin, Users } from 'lucide-react';
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
    description: 'Junte-se a nós para uma noite especial de celebração e arrecadação de fundos.',
  },
  {
    id: 2,
    title: 'Workshop de Desenvolvimento Comunitário',
    date: '22 de Março, 2024',
    time: '14:00',
    location: 'Sede The Graces OAC',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    category: 'Workshop',
    attendees: 50,
    description: 'Aprenda estratégias práticas para fortalecer sua comunidade local.',
  },
  {
    id: 3,
    title: 'Campanha de Doação de Alimentos',
    date: '5 de Abril, 2024',
    time: '10:00',
    location: 'Vários Locais',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    category: 'Campanha',
    attendees: 100,
    description: 'Participe da nossa iniciativa para ajudar famílias necessitadas.',
  },
];

export default function EventsSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#FAFAFA]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-[#E1BEE7] text-[#9C27B0] rounded-full text-sm font-accent font-medium mb-6">
            Próximos Eventos
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
            Participe dos Nossos Eventos
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Conecte-se com a comunidade e faça parte de iniciativas que transformam vidas
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-[#9C27B0] hover:bg-[#9C27B0]/90 font-accent">
                  {event.category}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="font-display font-bold text-xl text-[#263238] mb-3 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2 text-[#00BFA5]" />
                    <span>{event.date} às {event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2 text-[#00BFA5]" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-2 text-[#00BFA5]" />
                    <span>{event.attendees} participantes</span>
                  </div>
                </div>

                <Button className="w-full bg-[#00BFA5] hover:bg-[#00BFA5]/90" asChild>
                  <Link to={`/eventos/${event.id}`}>Ver Detalhes</Link>
                </Button>
              </CardContent>
            </Card>
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
            <Link to="/eventos">Ver Todos os Eventos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
