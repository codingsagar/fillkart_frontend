import React from "react";
import { Drawer } from "antd";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { TbLogout } from "react-icons/tb";
import { BsPersonSquare, BsFillEyeFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const AdminSideBarMobile = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer
        title="Admin Dashboard 🚀"
        placement="left"
        onClose={onClose}
        open={open}
        width={300}
      >
        <div className="flex flex-col gap-y-2 mb-6">
          <BsPersonSquare  size={35} className="text-black"/>
          <div>
            <p className="text-gray-800 font-medium">
              {user?.name}
              <span className="text-gray-400 text-xs font-normal capitalize">
                {" "}
                {user?.role}{" "}
              </span>
            </p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
          </div>
        </div>
        <ul className="flex flex-col gap-y-5">
          <NavLink to="/admin/dashboard" onClick={() => setOpen(false)}>
            <li className="inline-flex gap-x-2 sidebar-icon">
              <MdDashboard size={22} />
              Dashboard Overview
            </li>
          </NavLink>
          <NavLink to="/admin/manage/products" onClick={() => setOpen(false)}>
            <li className="inline-flex gap-x-2 sidebar-icon">
              <BsFillEyeFill size={22} />
              Manage Products
            </li>
          </NavLink>
          <NavLink to="/admin/manage/users" onClick={() => setOpen(false)}>
            <li className="inline-flex gap-x-2 sidebar-icon">
              <HiUsers size={22} />
              Manage Users
            </li>
          </NavLink>
          <NavLink to="/admin/view/orders" onClick={() => setOpen(false)}>
            <li className="inline-flex gap-x-2 sidebar-icon">
              <TiShoppingCart size={22} />
              View all orders
            </li>
          </NavLink>
        </ul>
        <button
          className="flex gap-x-2 items-center lg:text-gray-400 transition-all sidebar-logout absolute bottom-5 text-red-500"
          onClick={() => dispatch(logout())}
        >
          <TbLogout size={20} />
          Logout
        </button>
      </Drawer>
    </>
  );
};
export default AdminSideBarMobile;
