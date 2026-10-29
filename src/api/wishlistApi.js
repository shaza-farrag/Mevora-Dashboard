
import Axios from "./axios";

export const getAllWishlists = async (params = {}) => {
  const response = await Axios.get("/wishlists/admin/all", { params });
  return response.data;
};

export const getWishlistStats = async () => {
  const response = await Axios.get("/wishlists/admin/stats");
  return response.data;
};
