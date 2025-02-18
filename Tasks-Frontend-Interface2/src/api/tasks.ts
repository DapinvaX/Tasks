import axios from './axios';
import { Task, CreateTaskPayload, UpdateTaskPayload } from '../types';

// Obtener todas las tareas
export const getTasksReq = async (): Promise<Task[]> => {
  const response = await axios.get('/tasks');
  return response.data;
};

// Obtener una tarea por ID
export const getTaskByIdReq = async (id: number): Promise<Task> => {
  const response = await axios.get(`/tasks/${id}`);
  return response.data;
};

// Crear una nueva tarea
export const addTaskReq = async (task: CreateTaskPayload): Promise<Task> => {
  const response = await axios.post('/tasks', task);
  return response.data;
};

// Actualizar una tarea
export const updateTaskReq = async (id: number, task: UpdateTaskPayload): Promise<Task> => {
  const response = await axios.put(`/tasks/${id}`, task);
  return response.data;
};

// Eliminar una tarea
export const deleteTaskReq = async (id: number): Promise<void> => {
  await axios.delete(`/tasks/${id}`);
};