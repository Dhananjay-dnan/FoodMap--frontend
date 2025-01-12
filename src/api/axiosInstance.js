// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  // You can add headers or interceptors if needed
});

export default axiosInstance;