import axios from "axios";

const Axios = axios.create({
 baseURL:
  import.meta.env.VITE_API_URL ||
  "https://e-commerce-api-3wara.vercel.app",
  withCredentials: true,
   timeout: 20000, 
});

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
