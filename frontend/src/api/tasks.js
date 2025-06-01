import axios from './axios';

//Creamos una función que se encargará de hacer la petición a la API para registrar un usuario
export const getTasksReq = () => axios.get(`/tasks`);

export const getTaskIdReq = () => axios.get(`/tasks/:id`);

export const addTaskReq = task => axios.post(`/tasks`, task);

export const updateTaskReq = (id, task) => axios.put(`/tasks/${id}`, task);

export const deleteTaskReq = id => axios.delete(`/tasks/${id}`);