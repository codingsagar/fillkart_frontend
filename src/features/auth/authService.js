import axios from "axios";


const USER_BASE_API_URL = process.env.REACT_APP_BACKEND_API_URL+"user";

// register user

const register = async (userData) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.post(
    USER_BASE_API_URL + "/register",
    userData
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data.user;
};

// login user

const login = async (userData) => {
  const axiosInstance = axios.create({ withCredentials: true });

  const response = await axiosInstance.post(
    USER_BASE_API_URL + "/login",
    userData
  );

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data.user;
};

// logout user

const logout = async () => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.post(USER_BASE_API_URL + "/logout");
  localStorage.removeItem("user");
  console.log(response.data);
  return response.data;
};


// get all users only admin can access

const getAllUsers = async () => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.get(USER_BASE_API_URL);
  return response.data.users;
};

// update user role

const updateUserRole = async (user) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.put(`${USER_BASE_API_URL}/${user._id}`, {
    role: user.role,
  });
  return response.data.message;
};

// delete a user

const deleteUser = async (user_id) => {
  const axiosInstance = axios.create({ withCredentials: true });
  const response = await axiosInstance.delete(`${USER_BASE_API_URL}/${user_id}`);
  return response.data.message;
};

const authService = {
  register,
  login,
  logout,
  getAllUsers,
  updateUserRole,
  deleteUser
};

export default authService;
