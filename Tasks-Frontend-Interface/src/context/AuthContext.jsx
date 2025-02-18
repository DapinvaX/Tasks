/**
 * Contexto de autenticación que maneja el estado global de la sesión del usuario.
 * Proporciona información sobre el usuario autenticado y métodos relacionados.
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../api/auth';

const AuthContext = createContext();

/**
 * Proveedor del contexto de autenticación.
 * Gestiona el estado de autenticación y proporciona métodos para actualizarlo.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica el perfil del usuario al cargar la aplicación
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Verifica el estado de autenticación actual.
   * Actualiza el estado del usuario si hay una sesión válida.
   */
  const checkAuth = async () => {
    try {
      const userData = await getProfile();
      setUser(userData);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * @returns {Object} Contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}