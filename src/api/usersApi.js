
import Axios from "./axios";

export const getAllUsers = async (params = {}) => {
  const response = await Axios.get("/users/all", { params });
  return response.data;
};


export const addUser = async (userData) => {
  const response = await Axios.post("/users/add", userData);
  return response.data;
};


export const getUserById = async (id) => {
  const response = await Axios.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await Axios.patch(`/users/${id}`, userData);
  return response.data;
};


export const deleteUser = async (id) => {
  const response = await Axios.delete(`/users/${id}`);
  return response.data;
};
