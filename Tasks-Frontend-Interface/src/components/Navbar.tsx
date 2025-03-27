import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthProfile } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, Home, List, UserPlus, LogIn, User, Sun, Moon, ClipboardList, Menu, X } from 'lucide-react';
import { logoutReq } from '../API/auth';

export function Navbar() {
  const { isAuthenticated, setUser } = useAuthProfile();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutReq();
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
              <Home size={24} />
              <span className="font-semibold">Inicio</span>
            </Link>
          </div>

          {/* Center section - Title */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
            >
              <ClipboardList className="h-6 w-6" />
              <span className="text-xl font-bold">Gestión de Tareas</span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/tasks"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    <List size={20} />
                    <span>Tareas</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    <User size={20} />
                    <span>Perfil</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    <LogOut size={20} />
                    <span>Cerrar sesión</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    <LogIn size={20} />
                    <span>Iniciar sesión</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    <UserPlus size={20} />
                    <span>Registrarse</span>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/tasks"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Tareas
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-700 hover:text-white transition-colors duration-200"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-700 hover:text-white transition-colors duration-200"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}