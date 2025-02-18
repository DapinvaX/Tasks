import axios from './axios';
import { LoginCredentials, RegisterCredentials, User } from '../types';

// Configurar el token CSRF
export const setupCSRFToken = async (): Promise<void> => {
  try {
    const response = await axios.get('/csrf-token');
    const csrfToken = response.data.csrfToken;
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
  } catch (error) {
    console.error('Error obteniendo token CSRF:', error);
  }
};

export const register = async (user: RegisterCredentials): Promise<User> => {
  const response = await axios.post('/register', user);
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await axios.post('/login', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.post('/logout');
};

export const verifyToken = async (): Promise<User> => {
  const response = await axios.get('/auth/verify');
  return response.data;
  
};