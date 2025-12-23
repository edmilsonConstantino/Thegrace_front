import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#263238] via-gray-900 to-[#263238] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00BFA5] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#9C27B0] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-2xl flex items-center justify-center shadow-xl shadow-[#00BFA5]/30">
                <span className="text-white font-display font-bold text-xl">TG</span>
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-[#00BFA5]">The Graces</span>
                <span className="font-display font-bold text-2xl"> OAC</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Juntos fazemos a diferença. Uma associação dedicada a transformar vidas através da caridade e ação comunitária.
            </p>
            <div className="flex items-center text-sm text-gray-400">
              <Heart className="w-4 h-4 mr-2 text-[#00BFA5]" fill="currentColor" />
              Desde 2015
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { to: '/sobre', label: 'Sobre Nós' },
                { to: '/eventos', label: 'Eventos' },
                { to: '/galeria', label: 'Galeria' },
                { to: '/membros', label: 'Membros' },
                { to: '/concursos', label: 'Concursos' },
                { to: '/contato', label: 'Contato' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-[#00BFA5] transition-all duration-300 text-sm flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00BFA5]/20 transition-colors">
                  <MapPin size={18} className="text-[#00BFA5]" />
                </div>
                <span className="text-gray-300 text-sm pt-2">
                  Rua da Graça, 123<br />
                  Lisboa, Portugal 1170-165
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00BFA5]/20 transition-colors">
                  <Phone size={18} className="text-[#00BFA5]" />
                </div>
                <span className="text-gray-300 text-sm pt-2">+351 123 456 789</span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00BFA5]/20 transition-colors">
                  <Mail size={18} className="text-[#00BFA5]" />
                </div>
                <span className="text-gray-300 text-sm pt-2">info@thegraces.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-white">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Receba atualizações sobre nossos eventos e atividades.
            </p>
            <div className="flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Seu email"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#00BFA5] focus:ring-[#00BFA5]/20 h-12 rounded-xl"
              />
              <Button className="bg-gradient-to-r from-[#00BFA5] to-teal-500 hover:from-[#00BFA5] hover:to-[#9C27B0] w-full h-12 rounded-xl shadow-lg shadow-[#00BFA5]/30 hover:shadow-[#00BFA5]/50 transition-all duration-300 group">
                Inscrever
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-8">
              {[
                { icon: Facebook, href: 'https://facebook.com', color: 'hover:bg-blue-600' },
                { icon: Instagram, href: 'https://instagram.com', color: 'hover:bg-pink-600' },
                { icon: Twitter, href: 'https://twitter.com', color: 'hover:bg-sky-600' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-xl bg-white/5 ${social.color} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 The Graces OAC. Feito com <Heart className="inline w-4 h-4 text-red-500" fill="currentColor" /> em Lisboa
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacidade" className="text-gray-400 hover:text-[#00BFA5] text-sm transition-colors">
                Política de Privacidade
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/termos" className="text-gray-400 hover:text-[#00BFA5] text-sm transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
