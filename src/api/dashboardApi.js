
import Axios from "./axios";

export const getDashboardStats = async () => {
  const response = await Axios.get("/orders/admin/dashboard");
  return response.data;
};

