import axios from 'axios';

const api = axios.create({
  // Add '/api' to the end of your Render URL
  baseURL: 'https://attendance-management-system-vb0u.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;