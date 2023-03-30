import { axios } from "./axios.js";

export const GetAllProducts = async() => {
    try {
        const response = await axios.get('/product');
        return response.data;
      } catch (error) {
        console.log(error.message);
      }
}

export const GetProduct = async (productId) => {
  try {
    const response = await axios.get(`/product/${productId}`);
    return response.data
  } catch (error) {
    console.log(error.message);
  }
};

export const AddNewProduct = async(product) => {
  try {
      const response = await axios.post('/product', {
        product
      });
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
}

export const UpdateProduct = async (product) => {
  try {
    const response = await axios.put(`/product/${product.productId}`, {
      product,
    });
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}

export const DeleteProduct= async (productId) => {
  try {
    const response = await axios.delete(`/product/${productId}`);
    return response.data
  } catch (error) {
    console.log(error.message);
  }
}