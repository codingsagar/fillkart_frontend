import React, { useState, useEffect,useRef } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import {
  GiClothes,
  GiSofa,
  GiConverseShoe,
  GiMilkCarton,
} from "react-icons/gi";
import {TbTruckDelivery} from "react-icons/tb";
import { MdElectricalServices, MdDashboard } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { logout, reset } from "../features/auth/authSlice";
import { resetCart } from "../features/cart/cartSlice";
import { resetOrders } from "../features/orders/orderSlice";

const SidebarComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chalnaHa = useRef(true);
  const [display, setDisplay] = useState("none");

  const { user, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && chalnaHa.current) {
      if (message === "Logged out successfully !") {
        toast.success(message,{autoClose:1000});
        navigate("/login");
      }
    }
    dispatch(reset());
    dispatch(resetCart());
    dispatch(resetOrders());
    chalnaHa.current = ! chalnaHa.current;
    const timeId = setTimeout(() => {
      setDisplay("");
    }, 0);



    return () => {
      clearInterval(timeId);
    };
  }, [navigate, isSuccess, message, dispatch]);

  const { toggleSidebar } = useProSidebar();
  return (
    <div className={`flex h-full min-h-[400px] absolute z-50`}>
      <Sidebar
        breakPoint="always"
        backgroundColor="white"
        style={{ display: display }}
      >
        <Menu style={{ fontWeight: "500", fontSize: "14px" }}>
          <MenuItem
            prefix={<IoArrowBackOutline size={20} color="white" />}
            style={{
              backgroundColor: "rgb(94,61,227)",
              fontWeight: "500",
              color: "white",
              fontSize: "18px",
            }}
            onClick={() => toggleSidebar()}
          >
            FillKart
          </MenuItem>
          {user ? (
            <MenuItem
              prefix={<CgProfile size={18} color="#5E3DE3" />}
              onClick={() => toggleSidebar()}
              component={<Link to="/profile" />}
            >
              Your Profile
            </MenuItem>
          ) : null}

          {user?.role === "admin" ? (
            <MenuItem
              component={<Link to="/admin/dashboard" />}
              prefix={<MdDashboard size={18} color="gray" />}
              onClick={() => toggleSidebar()}
            >
              Admin Dashboard
            </MenuItem>
          ) : null}

          <MenuItem
            component={<Link to="/" />}
            prefix={<AiFillHome size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Home
          </MenuItem>

          <MenuItem
            component={<Link to="/products/clothes" />}
            prefix={<GiClothes size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Clothes
          </MenuItem>
          <MenuItem
            component={<Link to="/products/electronics" />}
            prefix={<MdElectricalServices size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Electronics
          </MenuItem>
          <MenuItem
            component={<Link to="/products/furniture" />}
            prefix={<GiSofa size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Furniture
          </MenuItem>
          <MenuItem
            component={<Link to="/products/shoes" />}
            prefix={<GiConverseShoe size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Shoes
          </MenuItem>
          <MenuItem
            component={<Link to="/products/grocery" />}
            prefix={<GiMilkCarton size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Grocery
          </MenuItem>
          <MenuItem
            component={<Link to="/cart" />}
            prefix={<HiShoppingCart size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Cart
          </MenuItem>
          <MenuItem
            component={<Link to="/orders" />}
            prefix={<TbTruckDelivery size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Your orders
          </MenuItem>
          {user ? (
            <MenuItem
              prefix={<TbLogout size={18} color="red" />}
              onClick={() => {
                dispatch(logout());
                toggleSidebar();
              }}
              className="text-red-500"
            >
              Logout
            </MenuItem>
          ) : (
            <>
              <MenuItem
                component={<Link to="/login" />}
                prefix={<FaUserCircle size={18} color="gray" />}
                onClick={() => toggleSidebar()}
              >
                Login
              </MenuItem>

              <MenuItem
                component={<Link to="/register" />}
                prefix={<BsFillPersonPlusFill size={18} color="gray" />}
                onClick={() => toggleSidebar()}
              >
                Register
              </MenuItem>
            </>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComp;
