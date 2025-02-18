export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  completed: boolean;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}