import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto de tema
const ThemeContext = createContext(null);

// Hook personalizado para usar el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null || context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Proveedor del contexto de tema
export function ThemeProvider({ children }) {
  // Obtener tema inicial de localStorage o usar 'light' como predeterminado
  const getInitialTheme = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedTheme = window.localStorage.getItem('theme');
        if (storedTheme === 'dark' || storedTheme === 'light') {
          return storedTheme;
        }
        
        // Si no hay tema guardado, intentar detectar la preferencia del sistema
        const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (userMedia.matches) {
          return 'dark';
        }
      }
    } catch (error) {
      console.error("Error al obtener tema inicial:", error);
    }
    
    return 'light'; // tema por defecto
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  // Aplicar clases al documento según el tema
  useEffect(() => {
    // Evitar efectos de hidratación en SSR
    setMounted(true);
    
    try {
      const root = window.document.documentElement;
      
      // Remover la clase anterior
      root.classList.remove('light', 'dark');
      
      // Añadir la nueva clase
      root.classList.add(theme);
      
      // Actualizar localStorage
      if (theme) {
        localStorage.setItem('theme', theme);
      }
    } catch (error) {
      console.error("Error al aplicar el tema:", error);
    }
  }, [theme]);

  // Función para cambiar entre temas
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Asegurarse de proporcionar un valor por defecto aunque no esté montado
  const contextValue = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;