import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-xl">TG</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-2xl text-[#00BFA5]">The Graces</span>
              <span className="font-display font-bold text-2xl text-[#263238]"> OAC</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors">
              Início
            </Link>
            <Link to="/sobre" className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors">
              Sobre
            </Link>
            <Link to="/eventos" className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors">
              Eventos
            </Link>
            <Link to="/galeria" className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors">
              Galeria
            </Link>
            <Link to="/membros" className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors">
              Membros
            </Link>
            <Link to="/concursos" className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors">
              Concursos
            </Link>
            <Link to="/contato" className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors">
              Contato
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90" asChild>
              <Link to="/registrar">Seja Membro</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#263238] hover:text-[#00BFA5] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/sobre"
                className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Sobre
              </Link>
              <Link
                to="/eventos"
                className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Eventos
              </Link>
              <Link
                to="/galeria"
                className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Galeria
              </Link>
              <Link
                to="/membros"
                className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Membros
              </Link>
              <Link
                to="/concursos"
                className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Concursos
              </Link>
              <Link
                to="/contato"
                className="text-[#263238] hover:text-[#00BFA5] font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Contato
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="outline" asChild>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button className="bg-[#00BFA5] hover:bg-[#00BFA5]/90" asChild>
                  <Link to="/registrar" onClick={() => setIsOpen(false)}>
                    Seja Membro
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
