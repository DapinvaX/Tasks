import React, { useRef } from 'react';

export function TextInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  ...props
}) {
  // Si no se proporciona un placeholder, usar la etiqueta como placeholder
  const inputPlaceholder = placeholder || (label ? label : '');

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={inputPlaceholder}
        required={required}
        className="w-full bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-0 transition-all duration-300 ease-in-out pb-1 px-1 text-gray-800 dark:text-white text-sm focus:text-base focus:pb-2 focus:border-b-3 focus:drop-shadow-sm"
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

// Variante para input de contraseña con toggle de visibilidad
export function PasswordInput({
  id,
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
  required = false,
  error,
  placeholder,
  ...props
}) {
  // Si no se proporciona un placeholder, usar la etiqueta como placeholder
  const inputPlaceholder = placeholder || (label ? label : '');
  
  // Crear una referencia al input de contraseña
  const passwordInputRef = useRef(null);

  // Función para alternar la visibilidad y mantener el foco
  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
    // Asegurar que el input reciba el foco después del cambio de estado
    setTimeout(() => {
      if (passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
    }, 10);
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={inputPlaceholder}
          required={required}
          ref={passwordInputRef}
          className="w-full bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-0 transition-all duration-300 ease-in-out pb-1 px-1 pr-10 text-gray-800 dark:text-white text-sm focus:text-base focus:pb-2 focus:border-b-3 focus:drop-shadow-sm"
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-1 text-gray-500 dark:text-gray-400"
          onClick={handleToggleVisibility}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
