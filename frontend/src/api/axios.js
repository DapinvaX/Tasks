import axios from 'axios';
import { API } from '../config';

//const API = 'http://localhost:4000/api';

const instance = axios.create({
    
    baseURL: API,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        //Header para las CORS
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true'
    }
});

// Utilidad para leer cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Interceptor para añadir el token CSRF a las peticiones protegidas
instance.interceptors.request.use((config) => {
  const method = config.method && config.method.toUpperCase();
  if (["POST", "PUT", "DELETE"].includes(method)) {
    const csrfToken = getCookie("XSRF-TOKEN");
    if (csrfToken) {
      config.headers["x-csrf-token"] = csrfToken;
    }
  }
  return config;
}, (error) => Promise.reject(error));

export default instance;