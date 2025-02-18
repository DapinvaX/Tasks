import React, { useState } from 'react';
import { login } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

// CSS personalizado para el toast
const customToastStyle = `
.custom-toast {
  background-color: #4caf50 !important;
  color: white !important;
  font-size: 16px !important;
  position: top-center !important;
}
.custom-toast-error {
  background-color: #f44336 !important;
  color: white !important;
  font-size: 16px !important;
  position: top-center !important;
}
`;

// Añadir el estilo personalizado al documento
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customToastStyle;
document.head.appendChild(styleSheet);

interface User {
  email: string;
  password: string;
}

export function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuth();

  const onSubmit = handleSubmit(async (user: User) => {
    try {
      const res = await login(user);
      console.log(res);

      const loged = setUser(user);
      console.log(loged);

      // document.getElementById("loginForm").reset();
    } catch (errors: any) {
      console.error(errors);

      const res = errors.response;

      if (res.status === 501) {
        return toast.error('El usuario no existe.', {
          position: "top-center",
          className: 'custom-toast-error',
        });
      }

      if (res.status === 505) {
        return toast.error('La contraseña es incorrecta.', {
          position: "top-center",
          className: 'custom-toast-error',
        });
      }

      return res.status === 500 && toast.error('Error interno del servidor.', {
        position: "top-center",
        className: 'custom-toast-error',
      });
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <LogIn className="h-12 w-12 text-blue-500 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Iniciar Sesión
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form id="loginForm" onSubmit={onSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Debe ingresar un correo electrónico." })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
            {errors.email && <small>{errors.email.message}</small>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Debe ingresar una contraseña." })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
            {errors.password && <small>{errors.password.message}</small>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}