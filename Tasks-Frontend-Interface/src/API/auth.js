/**
 * Módulo de autenticación que maneja las operaciones de registro, inicio de sesión y perfil de usuario.
 * Utiliza Axios para las peticiones HTTP.
 */
import axios from 'axios';

const API = 'http://localhost:4000/api';

// Remove standalone call that doesn't do anything
// axios.get('http://localhost:4000/api');

export const registerReq = user => axios.post(`${API}/register`, user);

export const loginReq = user => axios.post(`${API}/login`, user);

export const getProfileReq = () =>{ 

  //Obtenemos el token del localStorage
  const token = localStorage.getItem('token');

  //Si no se encuentra el token, se lanza un error
  if(!token){
    throw new Error('Token no encontrado. Acceso denegado.');
  }
  
  //Si se encuentra el token, se realiza la petición a la API
  return axios.get(`${API}/profile`, {
    //Se añade el token a los headers de la petición
    headers: {
      //Se añade el token al header de Authorization
      Authorization: `Bearer ${token}`
    }
  });

}


export const logoutReq = () => axios.post(`${API}/logout`);

export const verifyTokenReq = () => axios.get(`${API}/auth/verify`);
