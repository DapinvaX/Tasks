import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutReq } from '../api/auth';
import { Moon, Sun, Menu, X, LogOut, UserCircle, Home, Plus, CheckSquare } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';

export function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, user, setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  
  // Uso seguro del contexto de tema
  const { theme, toggleTheme } = useTheme();

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && showMenu) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleLogout = async () => {
    try {
      await logoutReq();
      setUser(null);
      setIsAuthenticated(false);
      
      toast.success("Sesión cerrada correctamente", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        className: theme === 'dark' ? 'custom-toast-dark' : 'custom-toast-light',
        progressClassName: 'custom-progress-neutral'
      });
      navigate('/'); // Redirigir a la página principal tras logout
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  console.log('Usuario en Navbar:', user); // Agregado para depuración

  return (
    <nav ref={navbarRef} className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Branding combinado: icono y título en un solo enlace */}
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/" : "/"} className="flex items-center transition-all duration-200 group hover:scale-105">
              <CheckSquare className="h-6 w-6 text-blue-600 dark:text-white transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              <span className="ml-2 text-blue-600 dark:text-white font-bold text-xl transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] dark:group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                TaskAPP
              </span>
            </Link>
          </div>
          
          {/* Botones para pantallas medianas y grandes */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/tasks" className="text-blue-600 dark:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 group group/user">
                  <UserCircle className="h-5 w-5 text-blue-600 dark:text-white transition-all duration-300 group-hover/user:scale-110 group-hover/user:drop-shadow-[0_0_12px_rgba(59,130,246,0.7)] dark:group-hover/user:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] align-middle" />
                  <span className="font-semibold transition-all duration-300 align-middle group-hover/user:scale-110 group-hover/user:drop-shadow-[0_0_12px_rgba(59,130,246,0.7)] dark:group-hover/user:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] group-hover/user:translate-x-1">
                    {user?.user || (typeof user === 'object' && user?.userdata?.user) || ''}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center hover:scale-105 hover:drop-shadow-md"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="bg-blue-600 dark:bg-gray-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(29,78,216,0.6)] dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                  Registro
                </Link>
              </>
            )}
            
            <button
              onClick={toggleTheme}
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-yellow-500 p-2 rounded-full transition-all duration-300 bg-transparent
                ${theme !== 'dark' 
                  ? 'hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]' 
                  : 'hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]'}`}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
          
          {/* Botón de menú y toggle para móviles */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-white p-2 rounded-md transition-all duration-200 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] dark:hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
              aria-expanded={showMenu}
              aria-label="Main menu"
            >
              {showMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            {/* Botón toggle de tema modificado para usar los mismos estilos de rotación */}
            <button
              onClick={toggleTheme}
              className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-yellow-500 p-2 rounded-full transition-all duration-300 bg-transparent
                ${theme !== 'dark' 
                  ? 'hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]' 
                  : 'hover:scale-125 hover:rotate-12 hover:drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]'}`}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil superpuesto */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 transition-all duration-300 ease-in-out ${
        showMenu 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform -translate-y-2 pointer-events-none'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link to="/tasks" className="text-blue-600 dark:text-white block px-3 py-2 rounded-md text-base font-medium items-center hover:scale-105 group">
                  <UserCircle className="h-5 w-5 mr-2 text-blue-600 dark:text-white transition-all duration-200 group-hover:text-blue-600 dark:group-hover:text-white group-hover:scale-125 group-hover:drop-shadow-[0_0_18px_rgba(59,130,246,0.9)] dark:group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]" />
                  <span className="ml-1">{user?.user || (typeof user === 'object' && user?.userdata?.user) || ''}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 flex items-center hover:scale-105 hover:drop-shadow-md"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover:scale-[1.02] hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="bg-blue-600 dark:bg-gray-500 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-[1.02] hover:drop-shadow-[0_0_12px_rgba(29,78,216,0.6)] dark:hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                  Registro
                </Link>
              </>
            )}
          </div>
        </div>
    </nav>
  );
}