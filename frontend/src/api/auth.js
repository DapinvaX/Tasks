import axios from 'axios';

// Modo de desarrollo - cambiar a false cuando el backend esté listo
const DEV_MODE = false; 

// Definir URLs del backend
const API_URL = 'http://localhost:4000/api'; // Cambiado de 3000 a 4000
const DEV_API_URL = 'http://localhost:2000/api'; // URL alternativa (ya tiene el puerto correcto)

// Crear una instancia de axios con la URL base
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000, // Timeout de 5 segundos para detectar problemas rápidamente
});

// Función para simular respuestas en modo desarrollo
const mockResponse = (type) => {
  const responses = {
    login: { 
      id: 1, 
      user: 'usuario_prueba', 
      email: 'usuario@ejemplo.com',
      token: 'mock-jwt-token-12345'
    },
    register: { 
      id: 2, 
      user: 'nuevo_usuario', 
      email: 'nuevo@ejemplo.com',
      token: 'mock-jwt-token-67890',
      status: 200 
    },
    profile: { 
      id: 1, 
      user: 'usuario_prueba', 
      email: 'usuario@ejemplo.com' 
    },
    logout: { 
      success: true, 
      message: 'Sesión cerrada con éxito' 
    }
  };
  
  return new Promise(resolve => {
    // Simular delay de red
    setTimeout(() => {
      resolve(responses[type] || {});
    }, 500);
  });
};

// Función para login
export const loginReq = async (userData) => {
  try {
    // Log para depuración
    console.log('Intentando login en:', `${API_URL}/login`);
    console.log('Con datos:', JSON.stringify(userData, null, 2));
    
    // En modo desarrollo, devuelve una respuesta simulada
    if (DEV_MODE) {
      console.log('MODO DESARROLLO: Simulando respuesta del backend');
      return await mockResponse('login');
    }
    
    // Asegurarnos de que enviamos los campos correctos
    // Algunos backends esperan 'username' en lugar de 'user'
    const dataToSend = {
      ...userData,
      // Añadimos campo alternativo para compatibilidad
      username: userData.user
    };
    
    const response = await api.post('/login', dataToSend);
    return response.data;
  } catch (error) {
    console.error('Error en loginReq:', error);
    
    // Mensaje más descriptivo según el tipo de error
    if (error.code === 'ERR_NETWORK') {
      console.error(`
        ⚠️ ERROR DE CONEXIÓN ⚠️
        No se pudo conectar al servidor en ${API_URL}.
        Verifica que:
        1. El servidor backend esté ejecutándose
        2. La URL y puerto sean correctos
        3. No haya problemas de CORS
        4. No haya bloqueos de firewall
      `);
      
      error.userMessage = '¡Error de conexión! El servidor no está disponible. Verifica que el backend esté funcionando.';
    }
    
    throw error;
  }
};

// Función para logout
export const logoutReq = async () => {
  try {
    // En modo desarrollo, devuelve una respuesta simulada
    if (DEV_MODE) {
      console.log('MODO DESARROLLO: Simulando logout');
      return await mockResponse('logout');
    }
    
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Error en logoutReq:', error);
    throw error;
  }
};

// Función para registro
export const registerReq = async (user) => {
  try {
    // En modo desarrollo, devuelve una respuesta simulada
    if (DEV_MODE) {
      console.log('MODO DESARROLLO: Simulando registro');
      return await mockResponse('register');
    }
    
    const response = await api.post('/register', user);
    return response.data;
  } catch (error) {
    console.error('Error en registerReq:', error);
    throw error;
  }
};

// Obtener perfil del usuario
export const getProfileReq = async () => {
  try {
    // En modo desarrollo, devuelve una respuesta simulada
    if (DEV_MODE) {
      console.log('MODO DESARROLLO: Simulando perfil');
      return await mockResponse('profile');
    }
    
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Error en getProfileReq:', error);
    throw error;
  }
};

// Verificar token (opcional)
export const verifyTokenReq = async () => {
  try {
    // En modo desarrollo, simula una verificación exitosa
    if (DEV_MODE) {
      console.log('MODO DESARROLLO: Simulando verificación de token');
      return { valid: true };
    }
    
    const response = await api.get('/verify');
    return response.data;
  } catch (error) {
    console.error('Error en verifyTokenReq:', error);
    throw error;
  }
};

// Agregar función para verificar existencia de usuario
/* export const checkUserExists = async (data) => {
  try {
    if (DEV_MODE) {
      if ((data.user && data.user === 'usuario_prueba') || (data.email && data.email === 'usuario@ejemplo.com')) {
        return true;
      }
      return false;
    }
    const response = await api.post('/checkUserExists', data);
    return response.data.exists; // se asume que el backend devuelve { exists: boolean }
  } catch (error) {
    console.error('Error en checkUserExists:', error);
    throw error;
  }
}; */