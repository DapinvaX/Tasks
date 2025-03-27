import axios from 'axios';

// Asumiendo que tienes una base URL configurada
const API = axios.create({
  baseURL: 'http://localhost:4000/api',  // Ajusta esto a tu URL real
  withCredentials: true
});

export const registerReq = async (user) => {
  try {
    const response = await API.post('/register', user);
    return response;
  } catch (error) {
    console.error('Error en registerReq:', error.response || error);
    throw error;
  }
};

export const loginReq = user => axios.post(`${API}/login`, user, {
    headers: {
        'Content-Type': 'application/json',
    }
});

export const logoutReq = () => axios.post(`${API}/logout`);

export const verifyTokenReq = () => axios.get(`${API}/auth/verify`);