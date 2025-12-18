import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display font-extrabold text-4xl lg:text-6xl text-white mb-6 leading-tight">
            Faça Parte da Mudança
          </h2>
          <p className="text-xl text-white/95 mb-12 leading-relaxed">
            Junte-se a centenas de pessoas que estão transformando vidas e construindo 
            uma comunidade mais forte e unida. Sua participação faz a diferença!
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-[#00BFA5]" size={32} />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Impacto Real
              </h3>
              <p className="text-white/90 text-sm">
                Contribua para projetos que transformam vidas
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-[#9C27B0]" size={32} />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Comunidade Ativa
              </h3>
              <p className="text-white/90 text-sm">
                Conecte-se com pessoas que compartilham seus valores
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-[#00BFA5]" size={32} />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Eventos Exclusivos
              </h3>
              <p className="text-white/90 text-sm">
                Acesso a workshops, galas e atividades especiais
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#00BFA5] hover:bg-white/90 text-lg px-10 py-7 h-auto font-bold shadow-xl"
              asChild
            >
              <Link to="/registrar">Tornar-se Membro</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#00BFA5] text-lg px-10 py-7 h-auto font-bold"
              asChild
            >
              <Link to="/doar">Fazer Doação</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
