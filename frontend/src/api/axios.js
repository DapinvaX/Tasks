import axios from 'axios';
import { API } from '../config';

//const API = 'http://localhost:4000/api';

const instance = axios.create({
    baseURL: API,
    withCredentials: true,
    timeout: 15000, // Aumentar timeout para servicios como Vercel/Render
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para agregar logs de depuración
instance.interceptors.request.use(
    (config) => {
        console.log(`🚀 Petición a: ${config.baseURL}${config.url}`);
        console.log('Método:', config.method?.toUpperCase());
        console.log('withCredentials:', config.withCredentials);
        
        // Log específico para cookies
        if (document.cookie) {
            console.log('🍪 Cookies del navegador:', document.cookie);
        } else {
            console.log('🚫 No hay cookies en el navegador');
        }
        
        if (config.data) {
            console.log('📄 Datos:', config.data);
        }
        return config;
    },
    (error) => {
        console.error('❌ Error en interceptor de petición:', error);
        return Promise.reject(error);
    }
);

// Interceptor para respuestas
instance.interceptors.response.use(
    (response) => {
        console.log(`✅ Respuesta exitosa de: ${response.config.url}`);
        console.log('Status:', response.status);
        return response;
    },
    (error) => {
        console.error(`❌ Error en petición a: ${error.config?.url}`);
        console.error('Error:', error.response?.data || error.message);
        
        if (error.code === 'ERR_NETWORK') {
            console.error('Error de red - El servidor no está disponible');
        } else if (error.response?.status === 401) {
            console.error('Error de autenticación - Token inválido o expirado');
        } else if (error.response?.status === 403) {
            console.error('Error de autorización - Acceso denegado');
        } else if (error.response?.status >= 500) {
            console.error('Error del servidor - Problema interno');
        }
        
        return Promise.reject(error);
    }
);

export default instance;