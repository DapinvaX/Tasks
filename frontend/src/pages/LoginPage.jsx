import { useState } from 'react';
import { loginReq } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';
import { hashPassword } from '../services/hashService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TextInput, PasswordInput } from '../components/UI/TextInput';
import { useTheme } from '../context/ThemeContext'; // Nueva importación

// Importamos el CSS de toastify con los estilos personalizados
import '../styles/toast.css';

export function LoginPage() {
  const [identifier, setIdentifier] = useState(''); // Puede ser usuario o email
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [useHashedPassword, setUseHashedPassword] = useState(true); // Nueva opción para probar sin hasheo
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado para controlar la visibilidad de la contraseña
  const { setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme(); // Usar el tema actual

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
        password: useHashedPassword ? '********' : passwordToSend // Mostrar la contraseña real en modo desarrollo
      });

      // Envía el identificador y la contraseña al backend
      // Intentar diferentes formatos de datos para mayor compatibilidad
      const loginData = { 
        user: identifier, 
        username: identifier, // Añadir campo alternativo
        email: identifier.includes('@') ? identifier : undefined, // Añadir email si parece ser uno
        password: passwordToSend 
      };

      const response = await loginReq(loginData);
      
      console.log('Respuesta del servidor:', response);
      
      // Actualiza el contexto de autenticación de manera segura
      if (typeof setUser === 'function') {
        setUser(response);
        if (typeof setIsAuthenticated === 'function') {
          setIsAuthenticated(true);
        }
      } else {
        console.error("setUser no es una función o no está disponible");
      }
      
      // Mostrar toast de éxito con estilos acorde a la temática
      let nombreUsuario = response?.userdata?.user || response?.user || identifier;
      toast.success(`Bienvenido a su página de tareas ${nombreUsuario}!`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: theme === 'dark' ? 'custom-toast-dark' : 'custom-toast-light',
        progressClassName: 'custom-progress-neutral'
      });
      
      // Redireccionar a la página de tareas en lugar de /profile
      console.log('Redirigiendo a la página de tareas...');
      navigate('/tasks'); // Cambiado de /profile a /tasks
      
    } catch (err) {
      console.error('Error de login:', err);
      
      // Mejorar el mensaje de error para mostrar información más útil
      let errorMessage;
      
      // Usar el mensaje personalizado si está disponible
      if (err.userMessage) {
        errorMessage = err.userMessage;
      } else if (err.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        if (err.response.status === 404) {
          errorMessage = 'La URL de login no existe. Verifica la configuración del backend.';
        } else if (err.response.status === 401) {
          errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          errorMessage = `Error ${err.response.status}: ${err.response.data?.message || JSON.stringify(err.response.data) || 'Error del servidor'}`;
        }
      } else if (err.request) {
        // La petición fue hecha pero no se recibió respuesta
        errorMessage = 'No se recibió respuesta del servidor. Verifica que el backend esté funcionando.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Error de conexión. No se pudo conectar al servidor. Verifica que el backend esté funcionando.';
      } else {
        // Error en la configuración de la petición
        errorMessage = `Error al configurar la petición: ${err.message}`;
      }
      
      setError(errorMessage);
      
      // Mostrar toast de error con estilos acorde a la temática
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 4000, // Más tiempo para leer errores complejos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: theme === 'dark' ? 'custom-toast-dark' : 'custom-toast-light',
        progressClassName: 'custom-progress-neutral'
      });
    }
  };

  return (
    <div className="flex items-center justify-center pt-16 md:pt-20 lg:pt-24 px-4 min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 my-8">
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
          <TextInput
            id="identifier"
            label="Usuario o Correo Electrónico"
            placeholder="Introduce tu usuario o email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <PasswordInput
            id="password"
            label="Contraseña"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            required
          />

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Iniciar Sesión
          </button>

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

        </form>
      </div>
    </div>
  );
}