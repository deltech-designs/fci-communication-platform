// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Intercept requests to include the JWT token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // SignOut and Input
// export const login = (email, password) =>
//   api.post("/auth/login", { email, password });
// export const register = (name, email, password) =>
//   api.post("/auth/register", { name, email, password });
// export const updateProfile = (data, token) =>
//   api.put("/auth/profile", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // Content CRUD
// export const fetchContent = () => api.get("/content");
// export const createContent = (data, token) =>
//   api.post("/content", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// export const updateContent = (id, data, token) =>
//   api.put(`/content/${id}`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// export const deleteContent = (id, token) =>
//   api.delete(`/content/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // Threads CRUD
// export const fetchThreads = () => api.get("/discussion/threads");
// export const createThread = (data, token) =>
//   api.post("/discussion/threads", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // Replies CRUD
// export const fetchReplies = (threadId) =>
//   api.get(`/discussion/threads/${threadId}/replies`);
// export const createReply = (threadId, data, token) =>
//   api.post(`/discussion/threads/${threadId}/replies`, data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

// // Resource API functions
// export const fetchResources = (params) => api.get("/resources", { params });
// export const createResource = (data) => api.post("/resources", data);

// // News API functions
// export const fetchNews = () => api.get("/news");
// export const createNews = (data) => api.post("/news", data);

// export default api;
