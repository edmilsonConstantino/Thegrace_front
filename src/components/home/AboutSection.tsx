import { Heart, Target, Eye, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Heart,
    title: 'Compaixão',
    description: 'Agimos com empatia e cuidado em todas as nossas iniciativas',
  },
  {
    icon: Target,
    title: 'Missão',
    description: 'Transformar vidas através da ação comunitária e caridade',
  },
  {
    icon: Eye,
    title: 'Visão',
    description: 'Uma comunidade unida e próspera para todos',
  },
  {
    icon: Award,
    title: 'Excelência',
    description: 'Comprometidos com a qualidade em tudo que fazemos',
  },
];

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-[#B2DFDB] text-[#00BFA5] rounded-full text-sm font-accent font-medium mb-6">
              Sobre Nós
            </span>
            <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
              Juntos Fazemos a Diferença
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              The Graces OAC é uma associação de caridade dedicada a transformar vidas através da ação comunitária. 
              Desde a nossa fundação, temos trabalhado incansavelmente para criar um impacto positivo na sociedade.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nossa missão é unir pessoas com propósitos comuns, promovendo eventos, iniciativas e programas que 
              beneficiam a comunidade e criam oportunidades para todos.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-display font-bold text-[#00BFA5] mb-2">500+</div>
                <div className="text-sm text-gray-600">Membros Ativos</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-[#9C27B0] mb-2">150+</div>
                <div className="text-sm text-gray-600">Eventos Realizados</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-[#00BFA5] mb-2">10K+</div>
                <div className="text-sm text-gray-600">Vidas Impactadas</div>
              </div>
            </div>
          </div>

          {/* Right Content - Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] flex items-center justify-center mb-4">
                    <value.icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#263238] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
