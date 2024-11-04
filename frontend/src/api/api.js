// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://fci-communication-platform-api.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Set up JWT for authorization in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);

// Chat endpoints
export const fetchThreads = () => api.get("/chat/threads");
export const createThread = (title, participants) =>
  api.post("/chat/create", { title, participants });
export const addMessage = (threadId, content) =>
  api.post("/chat/message", { threadId, content });

export default api;
