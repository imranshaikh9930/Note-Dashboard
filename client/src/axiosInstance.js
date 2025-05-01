// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://note-dashboard-backend-01.onrender.com/api', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Optional: if you're using cookies/session-based auth
});

export const googleAuth = (code) => axiosInstance.post(`/auth/google`, { code });


export default axiosInstance;
