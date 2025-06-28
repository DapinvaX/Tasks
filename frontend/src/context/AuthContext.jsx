import { createContext, useState, useContext, useEffect } from 'react';
import { getProfileReq } from '../api/auth';
import Cookies from 'js-cookie';

// Crear el contexto
export const AuthContext = createContext();

// Hook personalizado para facilitar el acceso al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export function AuthProvider({ children }) {
  
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  // Verificar si el usuario ya está autenticado al cargar la aplicación
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      try {
        const res = await getProfileReq();
        if (res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkLogin();
  }, []);

  // Función para limpiar errores
  const clearErrors = () => setErrors([]);

  // Objeto con los valores que se compartirán a través del contexto
  const contextValue = {
    user,
    setUser, // Aseguramos que setUser esté disponible en el contexto
    isAuthenticated,
    setIsAuthenticated,
    loading,
    errors,
    setErrors,
    clearErrors
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}