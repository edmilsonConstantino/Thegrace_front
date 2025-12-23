import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Image,
  Trophy,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  BarChart3,
  MessageSquare,
  ChevronRight,
  Search,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin', badge: null },
  { icon: FileText, label: 'Banners', path: '/admin/banners', badge: null },
  { icon: Calendar, label: 'Eventos', path: '/admin/eventos', badge: '3' },
  { icon: Users, label: 'Membros', path: '/admin/membros', badge: '5' },
  { icon: Trophy, label: 'Concursos', path: '/admin/concursos', badge: null },
  { icon: Image, label: 'Galeria', path: '/admin/galeria', badge: null },
  { icon: MessageSquare, label: 'Mensagens', path: '/admin/mensagens', badge: '12' },
  { icon: Bell, label: 'Notificações', path: '/admin/notificacoes', badge: null },
  { icon: BarChart3, label: 'Relatórios', path: '/admin/relatorios', badge: null },
  { icon: Settings, label: 'Configurações', path: '/admin/configuracoes', badge: null },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#263238] text-white`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-display font-bold">TG</span>
            </div>
            {sidebarOpen && (
              <span className="font-display font-bold text-lg">Admin</span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00BFA5] to-[#00BFA5]/80 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-[#00BFA5]'} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge className="bg-[#9C27B0] text-white text-xs px-2 py-0.5">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 ring-2 ring-[#00BFA5]">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" />
              <AvatarFallback className="bg-gradient-to-br from-[#00BFA5] to-[#9C27B0] text-white">
                AD
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-xs text-gray-400">admin@thegraces.org</p>
              </div>
            )}
            <Link
              to="/"
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Ir para o site"
            >
              <Home size={18} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 h-16 flex items-center px-6">
          <div className="flex items-center gap-4 flex-1">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-gray-500">
              <Link to="/admin" className="hover:text-[#00BFA5] transition-colors">
                Dashboard
              </Link>
              {location.pathname !== '/admin' && (
                <>
                  <ChevronRight size={16} className="mx-2" />
                  <span className="text-[#263238] font-medium capitalize">
                    {location.pathname.split('/').pop()}
                  </span>
                </>
              )}
            </nav>
          </div>

          {/* Search */}
          <div className="relative w-80 mr-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Pesquisar..."
              className="pl-10 h-10 bg-gray-100 border-none focus:ring-[#00BFA5]"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#9C27B0] rounded-full" />
          </Button>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
