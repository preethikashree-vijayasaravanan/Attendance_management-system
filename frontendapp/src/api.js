import axios from 'axios';

const api = axios.create({
  // Pointing directly to your newly created live Render API server
  baseURL: 'https://attendance-management-system-vb0u.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;