
import Axios from "./axios";


export const getProducts = async (params = {}) => {
  const response = await Axios.get("/products", { params });
  return response.data;
};


export const searchProducts = async (params = {}) => {
  const response = await Axios.get("/products/search", { params });
  return response.data;
};


export const getProductById = async (id) => {
  const response = await Axios.get(`/products/${id}`);
  return response.data;
};

export const buildProductFormData = (product) => {
  const formData = new FormData();

  const fields = [
    "name",
    "shortDescription",
    "description",
    "price",
    "discountPrice",
    "stock",
    "sku",
    "category",
    "subcategory",
    "brand",
    "featured",
    "isActive",
  ];

  fields.forEach((field) => {
    if (
      product[field] !== undefined &&
      product[field] !== null &&
      product[field] !== ""
    ) {
      formData.append(field, String(product[field]));
    }
  });

  if (product.tags !== undefined && product.tags !== null) {
    formData.append("tags", JSON.stringify(product.tags));
  }

  if (product.images?.length) {
    product.images.forEach((image) => {
      formData.append("images", image);
    });
  }

  return formData;
};


export const createProduct = async (product) => {
  const formData = buildProductFormData(product);

  const response = await Axios.post("/products", formData);
  return response.data;
};


export const buildUpdateProductFormData = (product) => {
  const formData = buildProductFormData(product);

  if (product.deletedImages?.length) {
    formData.append(
      "deletedImages",
      JSON.stringify(product.deletedImages)
    );
  }

  return formData;
};


export const updateProduct = async (id, product) => {
  const formData = buildUpdateProductFormData(product);

  const response = await Axios.patch(
    `/products/update/${id}`,
    formData
  );

  return response.data;
};


export const deleteProduct = async (id) => {
  const response = await Axios.delete(`/products/${id}`);
  return response.data;
};
