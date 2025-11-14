"use client";

import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, Plus, Search, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Password } from "./interfaces/Password.interface";
import { SAMPLE_PASSWORDS } from "@/data/data";
import { FormPasswordModal } from "./components";
import { HomeLayout } from "./layout";

const CATEGORIES = [
  "Todos",
  "Email",
  "Desarrollo",
  "Entretenimiento",
  "Redes Sociales",
  "Otros",
];

export const HomePage = () => {
  const [passwords, setPasswords] = useState<Password[]>(SAMPLE_PASSWORDS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showPasswords, setShowPasswords] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPasswords = useMemo(() => {
    return passwords.filter((pwd) => {
      const matchesSearch =
        pwd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pwd.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || pwd.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [passwords, searchTerm, selectedCategory]);

  const favorites = useMemo(() => {
    return filteredPasswords.filter((pwd) => pwd.isFavorite);
  }, [filteredPasswords]);

  const toggleFavorite = (id: string) => {
    setPasswords(
      passwords.map((pwd) =>
        pwd.id === id ? { ...pwd, isFavorite: !pwd.isFavorite } : pwd
      )
    );
  };

  const togglePasswordVisibility = (id: string) => {
    const newShowPasswords = new Set(showPasswords);
    if (newShowPasswords.has(id)) {
      newShowPasswords.delete(id);
    } else {
      newShowPasswords.add(id);
    }
    setShowPasswords(newShowPasswords);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deletePassword = (id: string) => {
    setPasswords(passwords.filter((pwd) => pwd.id !== id));
  };

  const handleAddPassword = (newPasswordData: {
    name: string;
    email: string;
    password: string;
    category: string;
    url?: string;
  }) => {
    const newPassword: Password = {
      id: String(passwords.length + 1),
      ...newPasswordData,
      isFavorite: false,
    };
    setPasswords([...passwords, newPassword]);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  if (!isAuthenticated) {
    console.log("no autenticado");
  }

  return (
    <HomeLayout onLogout={() => setIsAuthenticated(false)}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Mi Bóveda</h1>
          <p className="text-muted-foreground">
            Gestiona y accede a tus contraseñas de forma segura
          </p>
        </div>

        {/* Search and Add */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar contraseñas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            />
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar
          </Button>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Star className="w-6 h-6 fill-primary text-primary" />
              Favoritos
            </h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {favorites.map((pwd) => (
                <PasswordCard
                  key={pwd.id}
                  password={pwd}
                  isVisible={showPasswords.has(pwd.id)}
                  onToggleVisibility={togglePasswordVisibility}
                  onToggleFavorite={toggleFavorite}
                  onCopy={copyToClipboard}
                  onDelete={deletePassword}
                />
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Todas las contraseñas
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Passwords List */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredPasswords.map((pwd) => (
            <PasswordCard
              key={pwd.id}
              password={pwd}
              isVisible={showPasswords.has(pwd.id)}
              onToggleVisibility={togglePasswordVisibility}
              onToggleFavorite={toggleFavorite}
              onCopy={copyToClipboard}
              onDelete={deletePassword}
            />
          ))}
        </div>

        {filteredPasswords.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No se encontraron contraseñas
            </p>
          </div>
        )}

        {/* Add Password Modal */}
        <FormPasswordModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddPassword}
        />
      </div>
    </HomeLayout>
  );

  interface PasswordCardProps {
    password: Password;
    isVisible: boolean;
    onToggleVisibility: (id: string) => void;
    onToggleFavorite: (id: string) => void;
    onCopy: (text: string) => void;
    onDelete: (id: string) => void;
  }

  function PasswordCard({
    password,
    isVisible,
    onToggleVisibility,
    onToggleFavorite,
    onCopy,
    onDelete,
  }: PasswordCardProps) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {password.name}
            </h3>
            <p className="text-sm text-muted-foreground">{password.category}</p>
          </div>
          <button
            onClick={() => onToggleFavorite(password.id)}
            className="transition-colors"
          >
            <Star
              className={`w-5 h-5 ${
                password.isFavorite
                  ? "fill-primary text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            />
          </button>
        </div>

        {/* Email */}
        <div className="mb-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Email</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-foreground break-all">
              {password.email}
            </p>
            <button
              onClick={() => onCopy(password.email)}
              className="p-1.5 hover:bg-secondary rounded transition-colors"
            >
              <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </div>

        {/* Password */}
        <div className="mb-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Contraseña
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-foreground font-mono">
              {isVisible ? password.password : "••••••••"}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => onToggleVisibility(password.id)}
                className="p-1.5 hover:bg-secondary rounded transition-colors"
              >
                {isVisible ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                )}
              </button>
              <button
                onClick={() => onCopy(password.password)}
                className="p-1.5 hover:bg-secondary rounded transition-colors"
              >
                <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(password.id)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm font-medium">Eliminar</span>
        </button>
      </div>
    );
  }
};
