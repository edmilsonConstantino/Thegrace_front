import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Linkedin, Mail, Award, Zap } from 'lucide-react';

const members = [
  {
    id: 1,
    name: 'Maria Silva',
    role: 'Presidente',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Liderando com paixão há 5 anos',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 2,
    name: 'João Santos',
    role: 'Vice-Presidente',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Especialista em projetos sociais',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 3,
    name: 'Ana Costa',
    role: 'Coordenadora de Eventos',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: 'Criando experiências memoráveis',
    color: 'from-[#00BFA5] to-emerald-500',
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    role: 'Tesoureiro',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Garantindo sustentabilidade',
    color: 'from-[#9C27B0] to-purple-500',
  },
];

export default function MembersSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-36 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#B2DFDB]/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E1BEE7]/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#B2DFDB] to-[#E1BEE7] text-[#263238] rounded-full text-sm font-accent font-medium mb-6 border border-[#00BFA5]/20">
            <Users className="mr-2 w-4 h-4" />
            Nossa Equipe
          </div>
          <h2 className="font-display font-extrabold text-4xl lg:text-6xl text-[#263238] mb-6 leading-[1.1]">
            Conheça Nossos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA5] to-[#9C27B0]">
              Membros
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
            Pessoas dedicadas que fazem a diferença todos os dias
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {members.map((member, index) => (
            <Card
              key={member.id}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient Border on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ padding: '3px' }}>
                <div className="w-full h-full bg-white rounded-xl" />
              </div>

              <CardContent className="relative p-6 text-center">
                {/* Decorative Background */}
                <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-br ${member.color} opacity-10 rounded-t-xl`} />
                
                {/* Avatar */}
                <div className="relative mb-4 pt-4">
                  <Avatar className={`w-32 h-32 mx-auto ring-4 transition-all duration-500 ${
                    hoveredId === member.id ? 'ring-offset-4 scale-110' : 'ring-offset-0'
                  }`} 
                  style={{
                    ringColor: hoveredId === member.id ? 'transparent' : 'rgba(0, 191, 165, 0.2)'
                  }}>
                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                    <AvatarFallback className={`text-2xl bg-gradient-to-br ${member.color} text-white`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Floating Badge */}
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 transform transition-all duration-500 ${
                    hoveredId === member.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}>
                    <div className={`bg-gradient-to-r ${member.color} px-3 py-1 rounded-full shadow-lg`}>
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                <h3 className={`font-display font-bold text-xl text-[#263238] mb-2 transition-colors duration-300 ${
                  hoveredId === member.id ? 'text-transparent bg-clip-text bg-gradient-to-r ' + member.color : ''
                }`}>
                  {member.name}
                </h3>
                <p className="text-[#9C27B0] font-accent font-medium text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className={`flex justify-center gap-2 transform transition-all duration-500 ${
                  hoveredId === member.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <button className={`w-9 h-9 rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center hover:scale-110 transition-transform`}>
                    <Linkedin className="w-4 h-4 text-white" />
                  </button>
                  <button className={`w-9 h-9 rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center hover:scale-110 transition-transform`}>
                    <Mail className="w-4 h-4 text-white" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-br from-[#00BFA5] via-teal-500 to-[#9C27B0] rounded-3xl shadow-2xl shadow-[#00BFA5]/30 p-12 lg:p-16 text-center overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-6">
              <Zap className="mr-2 w-4 h-4" fill="white" />
              Junte-se a Nós
            </div>
            
            <h3 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-6">
              Quer Fazer Parte?
            </h3>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Junte-se a nós e faça parte de uma comunidade dedicada a transformar vidas. 
              Seja um membro ativo e contribua para um futuro melhor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#00BFA5] hover:bg-white/90 hover:scale-105 text-lg px-10 py-7 h-auto font-bold shadow-2xl transition-all duration-300 group"
                asChild
              >
                <Link to="/registrar">
                  Tornar-se Membro
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/80 text-white hover:bg-white hover:text-[#00BFA5] hover:scale-105 text-lg px-10 py-7 h-auto font-bold backdrop-blur-sm transition-all duration-300"
                asChild
              >
                <Link to="/membros">Ver Todos os Membros</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
