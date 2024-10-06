import axios from './axios.js';

// Obtener el token CSRF desde el servidor
axios.get('http://localhost:4000/api/csrf-token', { withCredentials: true })
  .then(response => {
    const csrfToken = response.data.csrfToken;

    // Configurar Axios para incluir el token CSRF en los encabezados de las solicitudes
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
     
    }
);

//Creamos una función que se encargará de hacer la petición a la API para registrar un usuario
export const getTasksReq = () => axios.get(`/tasks`);

export const getTaskIdReq = () => axios.get(`/tasks/:id`);

export const addTaskReq = task => axios.post(`/tasks`, task);

export const updateTaskReq = (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskReq = id => axios.delete(`/tasks/${id}`);

