/**
 * Módulo que maneja las operaciones CRUD para las tareas.
 * Proporciona funciones para interactuar con el backend de tareas.
 */
import axios from './axios';

/**
 * Obtiene todas las tareas del usuario actual.
 * @returns {Promise<Array>} Lista de tareas
 */
export const getTasksReq = async () => {
  const response = await axios.get('/api/tasks');
  return Array.isArray(response.data) ? response.data : [];
};

/**
 * Obtiene una tarea específica por su ID.
 * @param {string} id - ID de la tarea
 * @returns {Promise<Object>} Datos de la tarea
 */
export const getTaskReq = async (id) => {
  const response = await axios.get(`/api/tasks/${id}`);
  return response.data;
};

/**
 * Crea una nueva tarea.
 * @param {Object} task - Datos de la tarea a crear
 * @returns {Promise<Object>} Tarea creada
 */
export const createTaskReq = async (task) => {
  const response = await axios.post('/api/tasks', task);
  return response.data;
};

/**
 * Actualiza una tarea existente.
 * @param {string} id - ID de la tarea
 * @param {Object} task - Nuevos datos de la tarea
 * @returns {Promise<Object>} Tarea actualizada
 */
export const updateTaskReq = async (id, task) => {
  const response = await axios.put(`/api/tasks/${id}`, task);
  return response.data;
};

/**
 * Elimina una tarea.
 * @param {string} id - ID de la tarea a eliminar
 * @returns {Promise<void>}
 */
export const deleteTaskReq = async (id) => {
  await axios.delete(`/api/tasks/${id}`);
};