import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import {
  GiClothes,
  GiSofa,
  GiConverseShoe,
  GiMilkCarton,
} from "react-icons/gi";
import { MdElectricalServices } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const SidebarComp = () => {
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    const timeId = setTimeout(() => {
      setDisplay("");
    }, 0);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  const successNotify = () =>
    toast.success("Logged Out successfully !", {
      position: "top-center",
      autoClose: 3000,
    });
  const errorNotify = (message) =>
    toast.error(message, { position: "top-center", autoClose: 3000 });

  const { toggleSidebar } = useProSidebar();
  return (
    <div className={`flex h-full min-h-[400px] absolute z-50`}>
      <ToastContainer pauseOnFocusLoss position="top-center" autoClose={3000} />
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
          <MenuItem
            routerLink={<Link to="/" />}
            prefix={<AiFillHome size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Home
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/products/clothes" />}
            prefix={<GiClothes size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Clothes
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/products/electronics" />}
            prefix={<MdElectricalServices size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Electronics
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/products/furniture" />}
            prefix={<GiSofa size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Furniture
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/products/shoes" />}
            prefix={<GiConverseShoe size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Shoes
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/products/grocery" />}
            prefix={<GiMilkCarton size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Grocery
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/cart" />}
            prefix={<HiShoppingCart size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Cart
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/login" />}
            prefix={<FaUserCircle size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Login
          </MenuItem>

          <MenuItem
            routerLink={<Link to="/register" />}
            prefix={<BsFillPersonPlusFill size={18} color="gray" />}
            onClick={() => toggleSidebar()}
          >
            Register
          </MenuItem>

          <MenuItem prefix={<TbLogout size={18} color="gray" />}>
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComp;
