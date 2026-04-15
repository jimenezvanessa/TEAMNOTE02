// src/services/api.ts
import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_URL,
});

// Set auth token for future requests
export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// USERS
export const getUsers = (role: 'leader' | 'member' = 'member') => api.get('/users', { params: { role } });

// TASKS
export const getTasks = () => api.get('/tasks');
export const createTask = (taskData: any) => api.post('/tasks', taskData);
export const updateTask = (taskId: string, updatedData: any) => api.put(`/tasks/${taskId}`, updatedData);
export const deleteTask = (taskId: string) => api.delete(`/tasks/${taskId}`);

// AUTH
export const login = (credentials: { email: string; password: string }) => api.post('/auth/login', credentials);
export const register = (userData: { name: string; email: string; password: string; role: 'leader' | 'member' }) =>
  api.post('/auth/register', userData);

// HEALTH
export const checkHealth = () => api.get('/health');