import { useState } from 'react';
import { loginReq } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { hashPassword } from '../services/hashService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Importamos el CSS de toastify con los estilos personalizados
import '../styles/toast.css';

export function LoginPage() {
  const [identifier, setIdentifier] = useState(''); // Puede ser usuario o email
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [useHashedPassword, setUseHashedPassword] = useState(true); // Nueva opción para probar sin hasheo
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para controlar la visibilidad de la contraseña
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      let passwordToSend = password;
      
      // Hashear la contraseña solo si la opción está activada
      if (useHashedPassword) {
        passwordToSend = await hashPassword(password);
      }

      // Muestra los datos que se enviarán al backend (sin mostrar la contraseña en texto plano)
      console.log('Datos enviados:', { 
        user: identifier, 
        password: useHashedPassword ? '********' : '(sin hashear, solo para pruebas)' 
      });

      // Envía el identificador y la contraseña al backend
      const user = await loginReq({ 
        user: identifier, 
        password: passwordToSend 
      });
      
      console.log('Respuesta del servidor:', user);
      setUser(user);
      
      // Mostrar toast de éxito usando la clase personalizada existente
      toast.success("Sesión iniciada correctamente", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'custom-toast'
      });
      
      // Redireccionar a la página de perfil después de un login exitoso
      navigate('/profile');
      
    } catch (err) {
      console.error('Error de login:', err);
      
      // Capturar detalles específicos del error
      const errorMessage = err.response ? 
        `Error ${err.response.status}: ${err.response.data?.message || JSON.stringify(err.response.data)}` : 
        'Error al conectar con el servidor';
      
      setError(errorMessage);
      
      // Mostrar toast de error usando la clase personalizada existente
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'custom-toast-error'
      });
    }
  };

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
              <span className="text-[15px]"> {/* Cambiado a text-xs para un tamaño más pequeño */}
                Error al iniciar sesión. Por favor, inténtelo de nuevo.
              </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Usuario o Correo Electrónico
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 
                  <EyeOff className="h-5 w-5" aria-hidden="true" /> : 
                  <Eye className="h-5 w-5" aria-hidden="true" />
                }
              </button>
            </div>
          </div>

          {/* Opción para probar sin hasheo (solo para depuración) */}
          <div className="flex items-center">
            <input
              id="hashPassword"
              type="checkbox"
              checked={useHashedPassword}
              onChange={() => setUseHashedPassword(!useHashedPassword)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hashPassword" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Usar contraseña hasheada (desmarcar solo para pruebas)
            </label>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}