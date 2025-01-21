import axios from './axios.js'

/* const API = 'http://localhost:4000/api'; */
// Obtener el token CSRF desde el servidor
axios.get('http://localhost:4000/api/csrf-token', { withCredentials: true })
  .then(response => {
    const csrfToken = response.data.csrfToken;

    // Configurar Axios para incluir el token CSRF en los encabezados de las solicitudes
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
});

export const registerReq = async user => axios.post(`/register`, user);

export const loginReq = async user => axios.post(`/login`, user);

export const logoutReq = async () => axios.post(`/logout`);

export const verifyTokenReq = async () => axios.get(`/auth/verify`);