import React, { useRef, useState } from 'react';

// Regex para evitar caracteres especiales peligrosos (XSS)
const SAFE_TEXT_REGEX = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ _-]*$/;

export function TextArea({ id, label, value, onChange, placeholder, rows = 4, required = false, ...props }) {
  const labelRef = useRef(null);
  const [focused, setFocused] = useState(false);
  const [inputError, setInputError] = useState('');

  // Validación anti-XSS en el textarea
  const handleChange = (e) => {
    const val = e.target.value;
    if (!SAFE_TEXT_REGEX.test(val)) {
      setInputError('No se permiten caracteres especiales.');
    } else {
      setInputError('');
      onChange && onChange(e);
    }
  };

  return (
    <div className="relative">
      {label && (
        <label
          ref={labelRef}
          htmlFor={id}
          className={`block font-medium text-gray-700 dark:text-gray-300 mb-1 transition-all duration-200 ${focused ? 'text-xs text-blue-600 dark:text-blue-400' : 'text-sm'}`}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
            mt-1
            block
            w-full
            rounded-md
            border
            border-gray-300
            dark:border-gray-600
            shadow-sm
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500
            dark:focus:border-blue-400
            dark:focus:ring-blue-400
            dark:bg-gray-700
            dark:text-white
            transition-all
            duration-200
            resize-none
            min-h-[96px]
            focus:min-h-[150px]
            focus:outline-none
            text-sm md:text-base
        `}
        style={{ transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)' }}
        {...props}
      />
      {inputError && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{inputError}</p>
      )}
    </div>
  );
}
