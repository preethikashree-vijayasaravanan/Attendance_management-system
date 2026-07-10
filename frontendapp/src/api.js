import axios from 'axios';

const api = axios.create({
  baseURL: 'https://attendance-management-system-vb0u.onrender.com', // Remove /api
  headers: { 'Content-Type': 'application/json' }
});

export default api;