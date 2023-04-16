import { axios } from "./axios.js";

export const GetAllProducts = async () => {
  try {
    const response = await axios.get("/product");
    // Sort products by id
    const products = response.data;
    const sorted = products.slice(0).sort(function (a, b) {
      return a.productId < b.productId ? -1 : a.productId > b.productId ? 1 : 0;
    });
    return sorted;
  } catch (error) {
    console.log(error.message);
  }
};

export const GetProduct = async (productId) => {
  try {
    const response = await axios.get(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const AddNewProduct = async (product) => {
  console.log(product);
  try {
    const response = await axios.post("/product", {
      ...product,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateProduct = async (product) => {
  const { productId, ...others } = product;

  try {
    const response = await axios.put(`/product/${productId}`, {
      ...others,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const DeleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
