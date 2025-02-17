// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  // You can add headers or interceptors if needed
});

export default axiosInstance;