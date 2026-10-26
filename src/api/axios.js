
import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Axios;
