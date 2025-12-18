import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const members = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Presidente',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Liderando com paixão e dedicação há 5 anos',
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Vice-Presidente',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Especialista em gestão de projetos sociais',
  },
  {
    id: 3,
    name: 'Ana Costa',
    role: 'Coordenadora de Eventos',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: 'Criando experiências memoráveis para a comunidade',
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    role: 'Tesoureiro',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Garantindo transparência e sustentabilidade financeira',
  },
];

export default function MembersSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-[#B2DFDB]/30 to-[#E1BEE7]/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-white text-[#9C27B0] rounded-full text-sm font-accent font-medium mb-6">
            Nossa Equipe
          </span>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
            Conheça Nossos Membros
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Pessoas dedicadas que fazem a diferença todos os dias
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {members.map((member) => (
            <Card
              key={member.id}
              className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
            >
              <CardContent className="p-6 text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4 ring-4 ring-[#00BFA5]/20">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-display font-bold text-xl text-[#263238] mb-2">
                  {member.name}
                </h3>
                <p className="text-[#9C27B0] font-accent font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
          <h3 className="font-display font-bold text-3xl lg:text-4xl text-[#263238] mb-4">
            Quer Fazer Parte?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Junte-se a nós e faça parte de uma comunidade dedicada a transformar vidas. 
            Seja um membro ativo e contribua para um futuro melhor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#00BFA5] hover:bg-[#00BFA5]/90 text-lg px-8"
              asChild
            >
              <Link to="/registrar">Tornar-se Membro</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#9C27B0] text-[#9C27B0] hover:bg-[#9C27B0] hover:text-white text-lg px-8"
              asChild
            >
              <Link to="/membros">Ver Todos os Membros</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
