import React, { useState, useEffect } from 'react';

function PageTransition({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Pequeño retardo para asegurar que la transición funcione correctamente
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div 
      className={`transition-all duration-700 ease-in-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

export default PageTransition;
