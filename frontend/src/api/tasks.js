import api from './axios';

// Utilidad para obtener el token CSRF antes de peticiones protegidas
const fetchCsrfToken = async () => {
  try {
    await api.get('/csrf-token'); // Usar la instancia configurada
  } catch (e) {
    // No importa si da error, solo queremos la cookie
  }
};

export const getTasksReq = () => api.get(`/tasks`);

export const getTaskIdReq = () => api.get(`/tasks/:id`);

export const addTaskReq = async task => {
  await fetchCsrfToken();
  return api.post(`/tasks`, task);
};

export const updateTaskReq = async (id, task) => {
  await fetchCsrfToken();
  return api.put(`/tasks/${id}`, task);
};

export const deleteTaskReq = async id => {
  await fetchCsrfToken();
  return api.delete(`/tasks/${id}`);
};