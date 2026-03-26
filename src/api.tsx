// src/api.js
import axios from "axios";

// Use environment variable for backend URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // we'll define this in .env
  // withCredentials: true, // uncomment if using cookies/auth
});

export default api;