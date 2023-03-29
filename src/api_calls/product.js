import { axios } from "./axios.js";

export const GetAllProducts = async() => {
    try {
        const response = await axios.get('/product');
        return response.data;
      } catch (error) {
        console.log(error.message);
      }
}