import axios from './axios.ts';
import { LoginCredentials, RegisterCredentials, User } from '../types.js';

axios.get('http://localhost:4000/api/csrf-token', { withCredentials: true })
  .then(response => {
    const csrfToken = response.data.csrfToken;

    // Configurar Axios para incluir el token CSRF en los encabezados de las solicitudes
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
});

export const loginReq = async (credentials : LoginCredentials): Promise<User> => {
  const response = await axios.post('/login', credentials);
  return response.data;
};

export const registerReq = async (credentials : RegisterCredentials) => {
  const response = await axios.post('/register', credentials);
  return response.data;
};

export const logoutReq = async () => {
  await axios.post('/logout');
}; 

export const verifyTokenReq = async () => {
  axios.get(`/auth/verify`);
};

