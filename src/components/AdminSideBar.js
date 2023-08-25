import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsPersonSquare, BsFillEyeFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { TbLogout } from "react-icons/tb";
import { logout } from "../features/auth/authSlice";
const AdminSideBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="hidden bg-[#232323] md:w-60 text-white lg:flex fixed top-0 bottom-0 py-20 flex-col pl-5">
      <div className="self-start mt-4 flex flex-col gap-y-2">
        <BsPersonSquare color="white" size={35} />
        <div>
          <p className="text-white font-medium">
            {user?.name}
            <span className="text-gray-400 text-xs font-normal capitalize">
              {" "}
              {user?.role}{" "}
            </span>
          </p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
        </div>
      </div>
      <div className="my-10 text-sm text-gray-500">
        <ul className="flex flex-col gap-y-5">
          <NavLink to="/admin/dashboard">
            <li className="inline-flex gap-x-2 sidebar-icon">
              <MdDashboard size={22} />
              Dashboard Overview
            </li>
          </NavLink>
          <NavLink to="/admin/manage/products">
            <li className="inline-flex gap-x-2 sidebar-icon">
              <BsFillEyeFill size={22} />
              Manage Products
            </li>
          </NavLink>
          <NavLink to="/admin/manage/users">
            <li className="inline-flex gap-x-2 sidebar-icon">
              <HiUsers size={22} />
              Manage Users
            </li>
          </NavLink>
          <NavLink to="/admin/view/orders">
            <li className="inline-flex gap-x-2 sidebar-icon">
              <TiShoppingCart size={22} />
              View all orders
            </li>
          </NavLink>
        </ul>
      </div>

      <div className="mt-5">
        <button className="flex gap-x-2 items-center text-gray-400 transition-all sidebar-logout" onClick={()=>dispatch(logout())}>
          <TbLogout size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
