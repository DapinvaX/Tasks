import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { logoutReq } from '../api/auth';
import { LogOut, Home, List, UserPlus, LogIn, User, Sun, Moon, ClipboardList, Menu, X } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, setUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutReq();
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y título - visible en todos los tamaños */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
              <ClipboardList className="h-6 w-6" />
              <span className="font-bold text-lg hidden sm:block">Gestión de Tareas</span>
            </Link>
          </div>

          {/* Navegación para pantallas medianas y grandes */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              <Home className="h-5 w-5 inline-block mr-1" />
              <span>Inicio</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/tasks" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <List className="h-5 w-5 inline-block mr-1" />
                  <span>Tareas</span>
                </Link>
                <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <User className="h-5 w-5 inline-block mr-1" />
                  <span>Perfil</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200">
                  <LogOut className="h-5 w-5" />
                  <span>Cerrar sesión</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  <LogIn className="h-5 w-5 inline-block mr-1" />
                  <span>Iniciar sesión</span>
                </Link>
                <Link to="/register" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                  <UserPlus className="h-5 w-5" />
                  <span>Registrarse</span>
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Botón de menú móvil */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 mr-2"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={closeMenu}
          >
            <Home className="h-5 w-5 inline-block mr-2" />
            Inicio
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/tasks"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={closeMenu}
              >
                <List className="h-5 w-5 inline-block mr-2" />
                Tareas
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={closeMenu}
              >
                <User className="h-5 w-5 inline-block mr-2" />
                Perfil
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-5 w-5 inline-block mr-2" />
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={closeMenu}
              >
                <LogIn className="h-5 w-5 inline-block mr-2" />
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                onClick={closeMenu}
              >
                <UserPlus className="h-5 w-5 inline-block mr-2" />
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}