import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-[#263238] text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">TG</span>
              </div>
              <div>
                <span className="font-display font-bold text-xl text-[#00BFA5]">The Graces</span>
                <span className="font-display font-bold text-xl"> OAC</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Juntos fazemos a diferença. Uma associação dedicada a transformar vidas através da caridade e ação comunitária.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-[#00BFA5] transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="text-gray-300 hover:text-[#00BFA5] transition-colors text-sm">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-gray-300 hover:text-[#00BFA5] transition-colors text-sm">
                  Galeria
                </Link>
              </li>
              <li>
                <Link to="/membros" className="text-gray-300 hover:text-[#00BFA5] transition-colors text-sm">
                  Membros
                </Link>
              </li>
              <li>
                <Link to="/concursos" className="text-gray-300 hover:text-[#00BFA5] transition-colors text-sm">
                  Concursos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#00BFA5] mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Rua Exemplo, 123<br />
                  Lisboa, Portugal
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-[#00BFA5] flex-shrink-0" />
                <span className="text-gray-300 text-sm">+351 123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-[#00BFA5] flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@thegraces.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Receba atualizações sobre nossos eventos e atividades.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Seu email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90 w-full">
                Inscrever
              </Button>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00BFA5] flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00BFA5] flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00BFA5] flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 The Graces OAC. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/privacidade" className="text-gray-400 hover:text-[#00BFA5] text-sm transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="text-gray-400 hover:text-[#00BFA5] text-sm transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
