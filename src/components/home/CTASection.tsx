import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA5] via-teal-500 to-[#9C27B0] animate-gradient" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s', animationDuration: '7s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-5 py-2 bg-white/20 backdrop-blur-md text-white rounded-full text-sm font-accent font-medium mb-8 border border-white/30 shadow-xl">
            <Sparkles className="mr-2 w-4 h-4" fill="white" />
            Junte-se à Comunidade
          </div>

          {/* Title */}
          <h2 className="font-display font-extrabold text-4xl lg:text-7xl text-white mb-8 leading-[1.1] tracking-tight">
            Faça Parte da{' '}
            <span className="inline-block animate-pulse">
              Mudança
            </span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/95 mb-12 leading-relaxed max-w-3xl mx-auto">
            Junte-se a centenas de pessoas que estão transformando vidas e construindo 
            uma comunidade mais forte e unida. Sua participação faz a diferença!
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: Heart,
                title: 'Impacto Real',
                description: 'Contribua para projetos que transformam vidas',
                color: 'from-pink-500 to-rose-500',
              },
              {
                icon: Users,
                title: 'Comunidade Ativa',
                description: 'Conecte-se com pessoas que compartilham seus valores',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Calendar,
                title: 'Eventos Exclusivos',
                description: 'Acesso a workshops, galas e atividades especiais',
                color: 'from-amber-500 to-orange-500',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-[#00BFA5] hover:bg-white/95 hover:scale-105 text-lg px-12 py-8 h-auto font-bold shadow-2xl shadow-black/30 transition-all duration-300 group"
              asChild
            >
              <Link to="/registrar">
                <Zap className="mr-2 w-5 h-5" fill="currentColor" />
                Tornar-se Membro
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-[#00BFA5] hover:scale-105 text-lg px-12 py-8 h-auto font-bold backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link to="/contato">
                <Target className="mr-2 w-5 h-5" />
                Fazer Doação
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-medium">500+ Membros Ativos</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span className="font-medium">150+ Eventos Realizados</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/30" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <span className="font-medium">10K+ Vidas Impactadas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
