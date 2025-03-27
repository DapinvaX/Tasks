/**
 * Configuración del cliente Axios para realizar peticiones HTTP.
 */
import axios from 'axios';

//Declaramos la constante API que almacena la URL de la API
const API = 'http://localhost:4000/api';

const instance = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  },

  withCredentials: true,

});

// Interceptor para manejar errores de autenticación
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;