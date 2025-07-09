import axios from "axios";

const api = axios.create({
  baseURL: "https://carrental-7tiv.onrender.com/api",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
