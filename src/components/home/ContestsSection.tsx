import { Trophy, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const contests = [
  {
    id: 1,
    title: 'Concurso de Fotografia Social',
    description: 'Capture momentos que mostram o impacto da ação comunitária',
    deadline: '30 de Março, 2024',
    participants: 45,
    prize: '€500 + Exposição',
    status: 'Aberto',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80',
  },
  {
    id: 2,
    title: 'Projeto de Inovação Social',
    description: 'Apresente ideias inovadoras para resolver desafios comunitários',
    deadline: '15 de Abril, 2024',
    participants: 28,
    prize: '€1000 + Mentoria',
    status: 'Aberto',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  },
];

export default function ContestsSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-[#E1BEE7] text-[#9C27B0] rounded-full text-sm font-accent font-medium mb-6">
            Concursos
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
            Concursos Ativos
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Participe e mostre seu talento enquanto contribui para a comunidade
          </p>
        </div>

        {/* Contests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {contests.map((contest) => (
            <Card
              key={contest.id}
              className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={contest.image}
                  alt={contest.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 right-4 bg-[#4CAF50] hover:bg-[#4CAF50]/90 font-accent">
                  {contest.status}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="font-display font-bold text-2xl text-[#263238] mb-3">
                  {contest.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {contest.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-[#00BFA5]" />
                      <span>Prazo: {contest.deadline}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users size={16} className="mr-2 text-[#00BFA5]" />
                      <span>{contest.participants} participantes</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Trophy size={16} className="mr-2 text-[#9C27B0]" />
                      <span className="font-semibold text-[#9C27B0]">{contest.prize}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#9C27B0] hover:bg-[#9C27B0]/90" asChild>
                  <Link to={`/concursos/${contest.id}`}>Ver Detalhes e Participar</Link>
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
            className="border-2 border-[#9C27B0] text-[#9C27B0] hover:bg-[#9C27B0] hover:text-white"
            asChild
          >
            <Link to="/concursos">Ver Todos os Concursos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
