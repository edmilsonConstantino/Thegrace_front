import { Heart, Target, Eye, Award, ArrowRight, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: Heart,
    title: 'Compaixão',
    description: 'Agimos com empatia e cuidado em todas as nossas iniciativas',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Target,
    title: 'Missão',
    description: 'Transformar vidas através da ação comunitária e caridade',
    color: 'from-[#00BFA5] to-emerald-500',
  },
  {
    icon: Eye,
    title: 'Visão',
    description: 'Uma comunidade unida e próspera para todos',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Award,
    title: 'Excelência',
    description: 'Comprometidos com a qualidade em tudo que fazemos',
    color: 'from-[#9C27B0] to-purple-500',
  },
];

const stats = [
  { value: '500+', label: 'Membros Ativos', suffix: '' },
  { value: '150+', label: 'Eventos Realizados', suffix: '' },
  { value: '10K+', label: 'Vidas Impactadas', suffix: '' },
];

export default function AboutSection() {
  return (
    <section className="py-24 lg:py-36 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00BFA5]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9C27B0]/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center px-4 py-2 bg-[#B2DFDB]/50 text-[#00BFA5] rounded-full text-sm font-accent font-medium mb-6 border border-[#00BFA5]/20">
              <span className="w-2 h-2 bg-[#00BFA5] rounded-full mr-2" />
              Sobre Nós
            </span>
            <h2 className="font-display font-extrabold text-4xl lg:text-6xl text-[#263238] mb-6 leading-[1.1]">
              Juntos Fazemos a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA5] to-[#9C27B0]">
                Diferença
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              The Graces OAC é uma associação de caridade dedicada a transformar vidas através da ação comunitária. 
              Desde 2015, trabalhamos incansavelmente para criar um impacto positivo na sociedade.
            </p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Nossa missão é unir pessoas com propósitos comuns, promovendo eventos, iniciativas e programas que 
              beneficiam a comunidade e criam oportunidades para todos.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="relative">
                  <div className="text-4xl lg:text-5xl font-display font-extrabold bg-gradient-to-r from-[#00BFA5] to-[#9C27B0] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#00BFA5] hover:bg-[#00BFA5]/90 shadow-lg shadow-[#00BFA5]/25 hover:shadow-[#00BFA5]/40 transition-all duration-300 group"
                asChild
              >
                <Link to="/sobre">
                  Saiba Mais
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-200 hover:border-[#9C27B0] hover:text-[#9C27B0] transition-all duration-300 group"
              >
                <Play className="mr-2 w-4 h-4" fill="currentColor" />
                Ver Vídeo
              </Button>
            </div>
          </div>

          {/* Right Content - Values Grid */}
          <div className="relative">
            {/* Decorative Image Background */}
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-gradient-to-br from-[#00BFA5]/20 to-[#9C27B0]/20 rounded-3xl blur-2xl" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className={`border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden ${
                    index % 2 === 1 ? 'sm:translate-y-8' : ''
                  }`}
                >
                  <CardContent className="p-6 relative">
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="text-white" size={26} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#263238] mb-3 group-hover:text-[#00BFA5] transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
