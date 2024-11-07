import React, { useState } from "react";
import { Bell, Home, Menu, Plus, Search, Settings } from "lucide-react";
import { Card } from "../../components/admin/Card";
import DashboardHome from "./DashboardHome";
import TokenCreation from "./DashboardToken";
import axios from "axios";
import CreatePrize from "./DashboarPrize";
import TokenCreationManual from "./DarshboardTokenManual";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const NavButton = ({ icon, children, section }) => (
    <button
      className={`w-full flex items-center px-4 py-2 text-left ${
        activeSection === section
          ? "bg-white/20 text-white"
          : "text-white/60 hover:bg-white/10"
      }`}
      onClick={() => setActiveSection(section)}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </button>
  );

  const renderActiveComponent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />;
      case "create-token":
        return <TokenCreation />;
      case "create-token-manual":
        return <TokenCreationManual />;
       case "create-prize":
        return <CreatePrize />;
      /*case "view-users":
        return <Componente4 />; */
      default:
        return null;
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gradiente">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 bg-white/10 backdrop-blur-lg lg:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <NavButton icon={<Home className="w-5 h-5" />} section="dashboard">
            Dashboard
          </NavButton>
          <div className="my-4 border-t border-white/20" />
          <h3 className="px-4 text-xs font-semibold text-white/60 uppercase">
            Crear
          </h3>
          <NavButton icon={<Plus className="w-5 h-5" />} section="create-prize">
            Crear Premio
          </NavButton>
          <NavButton
            icon={<Plus className="w-5 h-5" />}
            section="create-token"
          >
            Crear Token con informacion de la Api
          </NavButton>
          <NavButton
            icon={<Plus className="w-5 h-5" />}
            section="create-token-manual"
          >
            Crear Token Manualmente
          </NavButton>
          <div className="my-4 border-t border-white/20" />
          <h3 className="px-4 text-xs font-semibold text-white/60 uppercase">
            Consultar
          </h3>
          <NavButton icon={<Search className="w-5 h-5" />} section="view-users">
            Ver Usuarios
          </NavButton>
          <NavButton
            icon={<Search className="w-5 h-5" />}
            section="view-projects"
          >
            Ver Token
          </NavButton>
          <NavButton icon={<Search className="w-5 h-5" />} section="view-stats">
            Ver Estadísticas
          </NavButton>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Bienvenido al Panel de Administración
              </h1>
              <p className="text-white/60">Gestiona usuarios, token y más</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            
            <button className="text-white">
              <Bell className="w-6 h-6" />
            </button>
            <button className="text-white">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Renderizar el componente activo */}
        {renderActiveComponent()}
      </main>
    </div>
  );
}
