import { API } from '../config';

// Función para probar la conectividad con el backend
export const testBackendConnection = async () => {
  console.log('🔍 Probando conectividad con el backend...');
  console.log('URL del backend:', API);
  
  try {
    // Probar conectividad básica
    const response = await fetch(`${API}/test`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('✅ Respuesta del backend:', response.status, response.statusText);
    console.log('🌐 Headers de respuesta:', [...response.headers.entries()]);
    
    if (response.ok) {
      const data = await response.json();
      console.log('📄 Contenido de la respuesta:', data);
    } else {
      console.log('❌ Error en la respuesta:', response.status);
    }
    
    return response.ok;
  } catch (error) {
    console.error('❌ Error de conectividad:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('🚫 Problema de CORS o red - El backend no está accesible');
      console.error('💡 Posibles causas:');
      console.error('   1. El backend está inactivo en Render');
      console.error('   2. Problema de CORS');
      console.error('   3. URL incorrecta');
      console.error('   4. Firewall/proxy bloqueando');
    }
    
    return false;
  }
};

// Función para verificar el estado del backend en Render
export const checkRenderBackendStatus = async () => {
  console.log('🔍 Verificando estado del backend en Render...');
  
  try {
    // Intentar conectar directamente sin /api/test
    const baseUrl = API.replace('/api', '');
    const response = await fetch(baseUrl, {
      method: 'GET',
      credentials: 'include',
    });
    
    console.log('📡 Respuesta del servidor base:', response.status);
    
    if (response.ok) {
      const text = await response.text();
      console.log('📄 Contenido:', text.substring(0, 200) + '...');
    }
    
    return response.ok;
  } catch (error) {
    console.error('❌ Backend en Render no responde:', error);
    return false;
  }
};

// Función para probar el endpoint de login
export const testLoginEndpoint = async () => {
  console.log('🔍 Probando endpoint de login...');
  
  try {
    const response = await fetch(`${API}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'test',
        password: 'test'
      })
    });
    
    console.log('📡 Respuesta del login:', response.status, response.statusText);
    console.log('🍪 Headers de cookies:', response.headers.get('set-cookie'));
    
    // Verificar cookies después del login
    setTimeout(() => {
      console.log('🍪 Cookies después del login:', document.cookie);
    }, 1000);
    
    if (response.status === 400 || response.status === 401) {
      console.log('✅ Endpoint de login accesible (credenciales incorrectas es normal)');
      return true;
    }
    
    return response.ok;
  } catch (error) {
    console.error('❌ Error en endpoint de login:', error);
    return false;
  }
};

// Función para probar login real con credenciales de prueba
export const testRealLogin = async (credentials = { user: 'testuser', password: 'testpass' }) => {
  console.log('🔐 Probando login real...');
  
  try {
    const response = await fetch(`${API}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });
    
    console.log('📡 Respuesta del login real:', response.status, response.statusText);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Login exitoso:', data);
      
      // Verificar cookies después del login exitoso
      setTimeout(() => {
        console.log('🍪 Cookies después del login exitoso:', document.cookie);
        
        // Probar acceso a tareas inmediatamente
        testTasksAfterLogin();
      }, 1000);
      
      return true;
    } else {
      const error = await response.json();
      console.log('❌ Login falló:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Error en login real:', error);
    return false;
  }
};

// Función para probar acceso a tareas después del login
export const testTasksAfterLogin = async () => {
  console.log('📋 Probando acceso a tareas después del login...');
  
  try {
    const response = await fetch(`${API}/tasks`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📡 Respuesta de tareas después del login:', response.status, response.statusText);
    console.log('🍪 Cookies enviadas:', document.cookie);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Tareas obtenidas exitosamente:', data);
      return true;
    } else {
      const error = await response.json();
      console.log('❌ Error al obtener tareas:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Error en petición de tareas:', error);
    return false;
  }
};

// Función para probar el endpoint de tareas
export const testTasksEndpoint = async () => {
  console.log('🔍 Probando endpoint de tareas...');
  
  try {
    const response = await fetch(`${API}/tasks`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📡 Respuesta de tareas:', response.status, response.statusText);
    
    if (response.status === 401) {
      console.log('✅ Endpoint de tareas accesible (no autorizado es normal sin login)');
      return true;
    }
    
    return response.ok;
  } catch (error) {
    console.error('❌ Error en endpoint de tareas:', error);
    return false;
  }
};

// Función para ejecutar todas las pruebas
export const runAllTests = async () => {
  console.log('🧪 Ejecutando pruebas de conectividad...');
  console.log('==================================');
  
  const results = {
    renderStatus: await checkRenderBackendStatus(),
    backend: await testBackendConnection(),
    login: await testLoginEndpoint(),
    tasks: await testTasksEndpoint(),
    cookies: await testCookieSupport()
  };
  
  console.log('==================================');
  console.log('📊 Resultados de las pruebas:');
  console.log('Render activo:', results.renderStatus ? '✅' : '❌');
  console.log('Backend conectado:', results.backend ? '✅' : '❌');
  console.log('Login accesible:', results.login ? '✅' : '❌');
  console.log('Tasks accesible:', results.tasks ? '✅' : '❌');
  console.log('Cookies funcionando:', results.cookies ? '✅' : '❌');
  
  // Recomendaciones basadas en los resultados
  console.log('==================================');
  console.log('💡 Recomendaciones:');
  
  if (!results.renderStatus) {
    console.log('❌ El backend en Render no responde. Verifica:');
    console.log('   - Que el servicio esté activo en Render');
    console.log('   - Que no haya errores en los logs de Render');
    console.log('   - Que la URL sea correcta');
  }
  
  if (!results.backend) {
    console.log('❌ Problema de conectividad. Verifica:');
    console.log('   - Configuración de CORS en el backend');
    console.log('   - Variables de entorno');
    console.log('   - Logs del servidor');
  }
  
  if (!results.cookies) {
    console.log('❌ Problema con cookies. Verifica:');
    console.log('   - Configuración de cookies en el backend');
    console.log('   - sameSite y secure settings');
    console.log('   - Que el navegador permita cookies de terceros');
  }
  
  console.log('==================================');
  
  return results;
};

// Función para probar soporte de cookies
export const testCookieSupport = async () => {
  console.log('🍪 Probando soporte de cookies...');
  
  try {
    // Establecer una cookie de prueba
    document.cookie = "test=123; path=/; SameSite=None; Secure";
    
    // Verificar si se estableció
    const cookieExists = document.cookie.includes('test=123');
    console.log('Cookie de prueba establecida:', cookieExists ? '✅' : '❌');
    
    // Limpiar cookie de prueba
    document.cookie = "test=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    return cookieExists;
  } catch (error) {
    console.error('❌ Error probando cookies:', error);
    return false;
  }
};

// Función para mostrar información del entorno
export const showEnvironmentInfo = () => {
  console.log('🌍 Información del entorno:');
  console.log('==================================');
  console.log('Modo:', import.meta.env.MODE);
  console.log('Producción:', import.meta.env.PROD);
  console.log('Desarrollo:', import.meta.env.DEV);
  console.log('URL Base API:', import.meta.env.VITE_API_URL);
  console.log('URL API calculada:', API);
  console.log('User Agent:', navigator.userAgent);
  console.log('==================================');
};
