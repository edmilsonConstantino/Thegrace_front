import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/shared/Chatbot';
import { Heart, Target, Eye, Award, Users, Calendar, Globe, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const timeline = [
  {
    year: '2015',
    title: 'Fundação',
    description: 'The Graces OAC foi fundada por um grupo de amigos com a visão de transformar vidas.',
  },
  {
    year: '2017',
    title: 'Primeiro Grande Evento',
    description: 'Realizamos nossa primeira gala de caridade, arrecadando fundos para famílias carentes.',
  },
  {
    year: '2019',
    title: 'Expansão Regional',
    description: 'Expandimos nossas operações para três novas cidades em Portugal.',
  },
  {
    year: '2021',
    title: 'Marco de 300 Membros',
    description: 'Atingimos a marca de 300 membros ativos, fortalecendo nossa comunidade.',
  },
  {
    year: '2023',
    title: 'Reconhecimento Nacional',
    description: 'Recebemos o prêmio de Melhor ONG Comunitária da região.',
  },
  {
    year: '2024',
    title: 'Novo Capítulo',
    description: 'Lançamento do portal digital para conectar ainda mais pessoas.',
  },
];

const values = [
  {
    icon: Heart,
    title: 'Compaixão',
    description: 'Agimos com empatia e cuidado em todas as nossas iniciativas, colocando as pessoas em primeiro lugar.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Target,
    title: 'Compromisso',
    description: 'Mantemos nosso foco na missão de transformar vidas e comunidades através da ação social.',
    color: 'from-[#00BFA5] to-emerald-500',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description: 'Prestamos contas de todas as nossas ações e recursos de forma clara e aberta.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Award,
    title: 'Excelência',
    description: 'Buscamos sempre a melhor qualidade em nossos projetos e iniciativas comunitárias.',
    color: 'from-[#9C27B0] to-purple-500',
  },
  {
    icon: Users,
    title: 'Colaboração',
    description: 'Trabalhamos juntos, valorizando a diversidade e a força do trabalho em equipe.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Globe,
    title: 'Sustentabilidade',
    description: 'Pensamos no futuro, criando projetos que geram impacto duradouro e positivo.',
    color: 'from-green-500 to-lime-500',
  },
];

const stats = [
  { value: '500+', label: 'Membros Ativos', icon: Users },
  { value: '150+', label: 'Eventos Realizados', icon: Calendar },
  { value: '10K+', label: 'Vidas Impactadas', icon: Heart },
  { value: '9', label: 'Anos de Atuação', icon: Sparkles },
];

export default function Sobre() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5] via-[#00BFA5]/80 to-[#9C27B0]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-accent font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Nossa História
              </span>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-7xl text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                Juntos Fazemos a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  Diferença
                </span>
              </h1>
              <p className="text-xl text-white/95 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                Desde 2015, a The Graces OAC tem sido um farol de esperança e transformação,
                unindo pessoas com propósitos comuns para criar um impacto real nas comunidades.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white relative -mt-16 z-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00BFA5]/10 to-[#9C27B0]/10 flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="text-[#00BFA5]" size={24} />
                    </div>
                    <div className="text-3xl lg:text-4xl font-display font-bold text-[#263238] mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 lg:py-32 bg-[#FAFAFA]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-[#B2DFDB] text-[#00BFA5] rounded-full text-sm font-accent font-medium mb-6">
                  Nossa Missão
                </span>
                <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
                  Transformar Vidas Através da Ação Comunitária
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Nossa missão é criar pontes entre pessoas, recursos e oportunidades, promovendo o desenvolvimento 
                  humano e social através de iniciativas que geram impacto real e duradouro nas comunidades.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Acreditamos que juntos podemos construir uma sociedade mais justa, inclusiva e solidária, 
                  onde cada pessoa tem a oportunidade de alcançar seu pleno potencial.
                </p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5]/20 to-[#9C27B0]/20 rounded-3xl transform rotate-3" />
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                  alt="Comunidade"
                  className="relative z-10 rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-[#E1BEE7] text-[#9C27B0] rounded-full text-sm font-accent font-medium mb-6">
                Nossos Valores
              </span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
                Princípios que Nos Guiam
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nossos valores são a base de tudo que fazemos e representam quem somos como organização
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  <CardContent className="p-8 relative">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.color} opacity-10 rounded-full blur-2xl transform translate-x-8 -translate-y-8 group-hover:opacity-20 transition-opacity duration-500`} />
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="text-white" size={32} />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-[#263238] mb-4">
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
        </section>

        {/* Timeline Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-[#B2DFDB]/30 to-[#E1BEE7]/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-white text-[#00BFA5] rounded-full text-sm font-accent font-medium mb-6">
                Nossa Jornada
              </span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-[#263238] mb-6 leading-tight">
                Uma História de Impacto
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Conheça os marcos importantes da nossa trajetória
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00BFA5] to-[#9C27B0]" />

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center gap-8 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] transform -translate-x-1/2 ring-4 ring-white shadow-lg" />

                    {/* Content */}
                    <div className={`ml-20 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                      <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#00BFA5] to-[#9C27B0] text-white text-sm font-bold rounded-full mb-3">
                            {item.year}
                          </span>
                          <h3 className="font-display font-bold text-xl text-[#263238] mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
