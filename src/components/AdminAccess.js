import React,{useEffect,useRef} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminAccess = () => {  
  const { user } = useSelector((state) => state.auth);

  let chalnaHa = useRef(true);

  useEffect(() => {

    if(chalnaHa.current){
        if(user?.role!=="admin"){
            toast.error("Only admin can access this resource !");
        }
        else if(!user){
            toast.error("Please login into your account !");
        }
    }

    chalnaHa.current = false;

  }, [user])
  


  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminAccess;
