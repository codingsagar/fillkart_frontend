import axios from "axios";



const CART_BASE_API_URL = process.env.REACT_APP_BACKEND_API_URL +"cart/";

// ADD A PRODUCT TO CART

const addToCart = async (productId) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.post(CART_BASE_API_URL + "add", {
    productId,
  });

  return response.data;
};

// REMOVE A PRODUCT FROM CART

const removeFromCart = async (productId) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.delete(CART_BASE_API_URL + "remove", {
    data: {
      productId: productId,
    },
  });

  return response.data;
};

// GET THE CART DATA

const getCartData = async () => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.get(CART_BASE_API_URL + "all");
  return response.data;
};

const cartService = {
  addToCart,
  removeFromCart,
  getCartData,
};

export default cartService;
