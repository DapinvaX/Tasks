//Importamos axios
import axios from 'axios';

//Declaramos la constante API que almacena la URL de la API
const API = 'http://localhost:4000/api';

//Creamos una instancia de axios con la URL de la API
const instancia = axios.create({
    //URL de la API
    baseURL: API,
    //Cabeceras de la petición
    headers: {
        'Content-Type': 'application/json',
    },

    //Permite enviar credenciales a través de las cookies en las solicitudes
    withCredentials: true
    
});

export default instancia;