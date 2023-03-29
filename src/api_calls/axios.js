import axiosLib from "axios";

const BASE_URL = "http://localhost:3000/api";

export const axios = axiosLib.create({
  baseURL: BASE_URL,
});
