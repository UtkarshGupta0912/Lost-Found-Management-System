import axios from 'axios';

const API = axios.create({
  baseURL: 'https://lost-found-management-system-backend.onrender.com',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (formData) => API.post('/register', formData);
export const loginUser = (formData) => API.post('/login', formData);

// Item APIs
export const getItems = () => API.get('/items');
export const getItemById = (id) => API.get(`/items/${id}`);
export const addItem = (itemData) => API.post('/items', itemData);
export const updateItem = (id, itemData) => API.put(`/items/${id}`, itemData);
export const deleteItem = (id) => API.delete(`/items/${id}`);
export const searchItems = (name) => API.get(`/items/search?name=${name}`);
