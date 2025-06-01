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

export default instance;