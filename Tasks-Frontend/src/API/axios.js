//Importamos axios
import axios from 'axios';

//Declaramos la constante API que almacena la URL de la API
const API = 'http://localhost:4000/api';

axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
    },
});