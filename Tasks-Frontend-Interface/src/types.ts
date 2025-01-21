export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
}

export interface EditTaskPayload {
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