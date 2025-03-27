import { useState } from 'react';
import { registerReq } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { hashPassword } from '../services/hashService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    try {
      // Hashear la contraseña con SHA-256 en lugar de bcrypt
      const hashedPassword = await hashPassword(password);
      
      // Crear objeto de usuario con los campos correctos que espera el backend
      const userData = {
        user: name,        // Cambiado de username a user para que coincida con el backend
        email: email,
        password: hashedPassword
      };
      
      console.log('Datos que se envían al backend:', { ...userData, password: '********' });
      
      // Enviar los datos al backend
      const response = await registerReq(userData);
      
      console.log('Respuesta del backend:', response);
      
      if(response.status === 200) {
        console.log("Usuario registrado con éxito");
        
        toast.success("Usuario registrado con éxito. Redirigiendo a la página de inicio...", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'custom-toast',
        });
        
        // Establecer el usuario en el contexto de autenticación
        setUser(response.data);
        
        // Limpiar los campos
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Redirigir a la página de inicio
        setTimeout(() => {
          navigate('/');
          console.log("Redirigido a la página de inicio");
        }, 1500); // Reducido el tiempo para mejor experiencia de usuario
      }
    } catch (error) {
      console.error("Error completo:", error);
      
      // Manejo de errores
      const res = error.response;
      
      if(res && res.status === 505) {
        console.error("El usuario ya existe");
        
        toast.error("El usuario ya existe", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'custom-toast-error',
        });
      } else {
        toast.error("Error al registrar! Inténtelo de nuevo.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'custom-toast-error',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <UserPlus className="h-12 w-12 text-blue-500 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Registro
        </h2>
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <div className="relative mt-1">
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
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirmar Contraseña
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 pr-10 ${
                  confirmPassword && password !== confirmPassword ? 'border-red-500 dark:border-red-500' : ''
                }`}
                required
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                Las contraseñas no coinciden
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}