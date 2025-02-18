/**
 * Módulo de autenticación que maneja las operaciones de registro, inicio de sesión y perfil de usuario.
 * Utiliza Axios para las peticiones HTTP.
 */
import axios from './axios';

/**
 * Registra un nuevo usuario en el sistema.
 * @param {Object} credentials - Datos del usuario (nombre, email, contraseña)
 * @returns {Promise<Object>} Datos del usuario registrado
 */
export const register = async (credentials) => {
  const response = await axios.post('/register', credentials);
  return response.data;
};

/**
 * Inicia sesión con las credenciales proporcionadas.
 * @param {Object} credentials - Credenciales de inicio de sesión (email, contraseña)
 * @returns {Promise<Object>} Datos del usuario autenticado
 */
export const login = async (credentials) => {
  const response = await axios.post('/login', credentials);
  return response.data;
};

/**
 * Cierra la sesión del usuario actual.
 * @returns {Promise<void>}
 */
export const logout = async () => {
  await axios.post('/logout');
};

/**
 * Obtiene el perfil del usuario actual.
 * @returns {Promise<Object>} Datos del perfil del usuario
 */
export const getProfile = async () => {
  const response = await axios.get('/profile');
  return response.data;
};