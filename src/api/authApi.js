
import Axios from "./axios";

export const login = async (credentials) => {
  const response = await Axios.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await Axios.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await Axios.get("/auth/me");
  return response.data;
};

export const testAdminAccess = async () => {
  const response = await Axios.get("/auth/admin-test");
  return response.data;
};

export const changeUserRole = async (userData) => {
  const response = await Axios.patch("/auth/change-role", userData);
  return response.data;
};
