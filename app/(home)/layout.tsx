"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export function HomeLayout({ children, onLogout }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } z-50`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-lg  from-primary to-accent flex items-center justify-center ">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-foreground">SafePass</h1>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <NavItem
              icon="🔐"
              label="Contraseñas"
              active
              collapsed={!sidebarOpen}
            />
            <NavItem icon="⭐" label="Favoritos" collapsed={!sidebarOpen} />
            <NavItem icon="📁" label="Categorías" collapsed={!sidebarOpen} />
            <NavItem icon="⚙️" label="Configuración" collapsed={!sidebarOpen} />
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-border space-y-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              {sidebarOpen ? (
                <>
                  <X className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Menu className="w-5 h-5" />
                </>
              )}
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg hover:bg-destructive/20 transition-colors text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span>Cerrar sesión</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

function NavItem({ icon, label, active, collapsed }: NavItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}
