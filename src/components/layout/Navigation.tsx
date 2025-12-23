import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { path: '/', label: 'Início' },
  { path: '/sobre', label: 'Sobre' },
  { path: '/eventos', label: 'Eventos' },
  { path: '/galeria', label: 'Galeria' },
  { path: '/membros', label: 'Membros' },
  { path: '/concursos', label: 'Concursos' },
  { path: '/contato', label: 'Contato' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-lg shadow-lg shadow-black/5' 
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-xl flex items-center justify-center shadow-lg shadow-[#00BFA5]/20 group-hover:shadow-[#00BFA5]/40 transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-display font-bold text-xl">TG</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-2xl text-[#00BFA5]">The Graces</span>
              <span className="font-display font-bold text-2xl text-[#263238]"> OAC</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`relative px-4 py-2 font-medium transition-all duration-300 rounded-lg group ${
                    isActive 
                      ? 'text-[#00BFA5]' 
                      : 'text-[#263238] hover:text-[#00BFA5]'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#00BFA5] to-[#9C27B0] rounded-full transition-all duration-300 ${
                    isActive ? 'w-6' : 'w-0 group-hover:w-6'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              className="text-[#263238] hover:text-[#00BFA5] hover:bg-[#00BFA5]/5 font-medium"
              asChild
            >
              <Link to="/login">Entrar</Link>
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#00BFA5] to-[#00BFA5] hover:from-[#00BFA5] hover:to-[#9C27B0] shadow-lg shadow-[#00BFA5]/25 hover:shadow-[#00BFA5]/40 transition-all duration-300 group" 
              asChild
            >
              <Link to="/registrar">
                Seja Membro
                <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-11 h-11 rounded-xl bg-gray-100 hover:bg-[#00BFA5]/10 flex items-center justify-center text-[#263238] hover:text-[#00BFA5] transition-all duration-300"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-[#00BFA5] bg-[#00BFA5]/5' 
                        : 'text-[#263238] hover:text-[#00BFA5] hover:bg-[#00BFA5]/5'
                    }`}
                    style={{ 
                      transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                      transform: isOpen ? 'translateX(0)' : 'translateX(-10px)',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  className="w-full justify-center border-gray-200"
                  asChild
                >
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button 
                  className="w-full justify-center bg-gradient-to-r from-[#00BFA5] to-[#00BFA5] hover:from-[#00BFA5] hover:to-[#9C27B0]" 
                  asChild
                >
                  <Link to="/registrar">
                    Seja Membro
                    <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
