import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";

// Public Pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Eventos = lazy(() => import("./pages/Eventos"));
const Galeria = lazy(() => import("./pages/Galeria"));
const Membros = lazy(() => import("./pages/Membros"));
const Concursos = lazy(() => import("./pages/Concursos"));
const Contato = lazy(() => import("./pages/Contato"));

// Admin Pages
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const DashboardHome = lazy(() => import("./pages/admin/DashboardHome"));
const AdminBanners = lazy(() => import("./pages/admin/AdminBanners"));
const AdminEventos = lazy(() => import("./pages/admin/AdminEventos"));
const AdminMembros = lazy(() => import("./pages/admin/AdminMembros"));
const AdminConcursos = lazy(() => import("./pages/admin/AdminConcursos"));
const AdminGaleria = lazy(() => import("./pages/admin/AdminGaleria"));
const AdminMensagens = lazy(() => import("./pages/admin/AdminMensagens"));
const AdminConfiguracoes = lazy(() => import("./pages/admin/AdminConfiguracoes"));

function App() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B2DFDB]/30 to-[#E1BEE7]/30">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 border-4 border-[#00BFA5] border-t-[#9C27B0] rounded-full animate-spin mb-4" />
          <p className="text-[#263238] font-display font-medium animate-pulse">Carregando...</p>
        </div>
      </div>
    }>
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Register />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/membros" element={<Membros />} />
          <Route path="/concursos" element={<Concursos />} />
          <Route path="/contato" element={<Contato />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="eventos" element={<AdminEventos />} />
            <Route path="membros" element={<AdminMembros />} />
            <Route path="concursos" element={<AdminConcursos />} />
            <Route path="galeria" element={<AdminGaleria />} />
            <Route path="mensagens" element={<AdminMensagens />} />
            <Route path="configuracoes" element={<AdminConfiguracoes />} />
          </Route>
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
