import axios from './axios.js'

/* const API = 'http://localhost:4000/api'; */

export const registerReq = user => axios.post(`/register`, user);

export const loginReq = user => axios.post(`/login`, user);

export const verifyTokenReq = () => axios.get(`/auth/verify`);