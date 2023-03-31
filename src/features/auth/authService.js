import axios from "axios";

const API_URL = 'http://localhost:5200/api/user';

// register user

const register = async(userData) =>{
    const axiosInstance = axios.create({withCredentials:true});
    const response = await axiosInstance.post(API_URL+'/register',userData);
    console.log(response.data);
    if (response.data){
        localStorage.setItem('user',JSON.stringify(response.data.user));
    }

    return response.data.user;
}


// login user

const login = async(userData) =>{
    const response = await axios.post(API_URL+'/login',userData);

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data.user));
    }
    return response.data;
}


// logout user

const logout = async ()=>{
    const response = await axios.get(API_URL+'/logout');

    return response.data;
}

const authService = {
    register,
    login,
    logout
}


export default authService;