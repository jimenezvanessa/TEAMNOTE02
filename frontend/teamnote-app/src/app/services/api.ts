// src/services/api.ts
import axios from 'axios';

export const API_URL =
  (import.meta as any).env?.VITE_API_URL || '/api';

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

// ✅ USERS (returns data directly)
export const getUsers = async (role: 'member' | 'leader' = 'member') => {
  const res = await api.get('/users', { params: { role } });
  return res.data;
};

// TASKS
export const getTasks = async () => {
  const res = await api.get('/tasks');
  return res.data;
};

export const createTask = async (taskData: any) => {
  const res = await api.post('/tasks', taskData);
  return res.data;
};

export const updateTask = async (taskId: string, updatedData: any) => {
  const res = await api.put(`/tasks/${taskId}`, updatedData);
  return res.data;
};

export const deleteTask = async (taskId: string) => {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
};

// AUTH
export const login = async (credentials: { email: string; password: string }) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
role: 'leader' | 'member';
}) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

// HEALTH
export const checkHealth = async () => {
  const res = await api.get('/health');
  return res.data;
};