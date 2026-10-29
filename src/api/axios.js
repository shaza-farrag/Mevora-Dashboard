import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://e-commerce-api-3wara.vercel.app",
  withCredentials: true,
});

// Request Interceptor — automatically attach JWT Token from localStorage if present
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Axios;
