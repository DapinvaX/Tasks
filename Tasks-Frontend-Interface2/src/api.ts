import axios from 'axios';
import { Task, EditTaskPayload } from './types';

// Get all tasks for the logged-in user
export const fetchUserTasks = async (): Promise<Task[]> => {
  const response = await axios.get('/tasks');
  // Ensure we're returning an array, even if the response is empty
  return Array.isArray(response.data) ? response.data : [];
};

// Get a specific task by ID
export const getTaskById = async (id: number): Promise<Task> => {
  const response = await axios.get(`/tasks/${id}`);
  return response.data;
};

// Create a new task
export const createTask = async (task: Omit<Task, 'id' | 'userId'>): Promise<Task> => {
  const response = await axios.post('/tasks', task);
  return response.data;
};

// Update an existing task
export const updateTask = async (id: number, task: EditTaskPayload): Promise<Task> => {
  const response = await axios.put(`/tasks/${id}`, task);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`/tasks/${id}`);
};