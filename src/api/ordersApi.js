
import Axios from "./axios";

export const getDashboardStats = async () => {
  const response = await Axios.get("/orders/admin/dashboard");
  return response.data;
};

export const getActiveCarts = async (params = {}) => {
  const response = await Axios.get("/orders/admin/carts", { params });
  return response.data;
};

export const getAllOrders = async (params = {}) => {
  const response = await Axios.get("/orders/admin", { params });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await Axios.get(`/orders/admin/${id}`);
  return response.data;
};


export const updateOrderStatus = async (id, status, adminNote) => {
  const response = await Axios.patch(
    `/orders/admin/${id}/status`,
    {
      status,
      adminNote,
    }
  );

  return response.data;
};

