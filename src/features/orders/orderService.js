import axios from "axios";

const ORDER_BASE_API_URL = process.env.REACT_APP_BACKEND_API_URL +"order/";

// GET ORDERS FOR THE USER

const getOrders = async () => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.get(ORDER_BASE_API_URL + "getOrder");

  return response.data;
};

// GET ORDERS OF ALL THE USERS

const getAllOrders = async () => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.get(ORDER_BASE_API_URL + "all");

  return response.data;
};



// GET ORDERS DATA SALES DATA


const getSalesData = async () => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.get(ORDER_BASE_API_URL + "data");

  return response.data;
};

const orderService = {
  getOrders,
  getAllOrders,
  getSalesData
};

export default orderService;
