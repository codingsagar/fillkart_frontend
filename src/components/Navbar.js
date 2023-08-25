import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import SidebarComp from "./SidebarComp";
import { useProSidebar } from "react-pro-sidebar";
import { useSelector, useDispatch } from "react-redux";
import { ImSearch } from "react-icons/im";
import { resetCart, getCartData } from "../features/cart/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { RiArrowDownSFill } from "react-icons/ri";
import { Dropdown, message } from "antd";
import { MdAccountCircle, MdSpaceDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  


  const error = () => {
    messageApi.open({
      type: "error",
      content: "Search term should be 3 characters long!",
      duration:1.2
    });
  };

  const { toggleSidebar } = useProSidebar();

  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user) {
      dispatch(getCartData());
    } else {
      dispatch(resetCart());
    }
  }, [dispatch, user]);

  const items = [
    {
      key: "1",
      label: <Link to="orders">My Orders</Link>,
      icon: <TbTruckDelivery size={20} className="text-primary" />,
    },
    {
      key: "2",
      label: <Link to="/profile">My Account</Link>,
      icon: <MdAccountCircle size={20} className="text-primary" />,
    },
    {
      key: "3",
      label: <Link to="admin/dashboard">Admin Dashboard</Link>,
      icon: <MdSpaceDashboard size={20} className="text-primary" />,
      disabled: user?.role !== "admin",
    },
    {
      key: "4",
      danger: true,
      label: "Logout",
      icon: <FiLogOut size={20} className="text-primary" />,
    },
  ];

  const onClick = ({ key }) => {
    switch (key) {
      case "4":
        dispatch(logout());
        dispatch(resetCart());
        break;
      default:
        break;
    }
  };

  return (
    <>
      <SidebarComp />
      {contextHolder}
      <nav
        className="bg-primary h-[65px] flex items-center sticky top-0
    justify-evenly z-10"
      >
        <div className="cursor-pointer md:hidden" onClick={toggleSidebar}>
          <CgMenu color="white" size={22} />
        </div>
        <div className="flex gap-x-2 md:gap-x-7 ml-[-5px] items-center">
          <Link to="/">
            <div className="mt-0 sm:mt-[-7px] ml-2">
              <p className="text-white text-[20px] font-bold text-center">
                FillKart
              </p>
              <p className="text-[#FFE500] hidden sm:block text-[8px] mt-[-4px] font-medium tracking-wide">
                Buy more, spend more
              </p>
            </div>
          </Link>
          <div className="relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.length >= 3) {
                  navigate(`/search/${searchQuery}`);
                }
              }}
            >
              <input
                type="search"
                name="search"
                id="search"
                className="w-[50vw] rounded-md h-9 outline-none px-3 placeholder:text-sm text-sm text-gray-700"
                placeholder="Search here"
                autoComplete="off"
                spellCheck="false"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0  h-full px-4 flex items-center bg-gray-200 rounded-r-md  top-0"
                onClick={() => {
                  searchQuery.length < 3
                    ? error()
                    : navigate(`/search/${searchQuery}`);
                }}
              >
                <ImSearch size={18} />
              </button>
            </form>
          </div>

          {user ? (
            <Link to="/profile">
              <div className="hidden md:block">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name}`}
                  alt="User Profile"
                  className="rounded-full h-10"
                  title={`${user?.name} Profile Page`}
                />
              </div>
            </Link>
          ) : (
            <Link to="/">
              <p className="text-white font-semibold hidden lg:block">
                Download app
              </p>
            </Link>
          )}

          {user ? (
            <>
              <Dropdown
                menu={{ items, onClick }}
                trigger={["click"]}
                className="font-bold text-white cursor-pointer hidden md:flex"
                id="dropdown"
              >
                <a
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center"
                  href="#dropdown"
                >
                  More
                  <RiArrowDownSFill size={20} />
                </a>
              </Dropdown>
            </>
          ) : null}

          {!user ? (
            <Link to="/login">
              <button className="text-primary font-medium h-8 w-20 bg-white hidden md:block rounded-sm ">
                Login
              </button>
            </Link>
          ) : null}

          <Link to="/cart">
            <div className="flex relative mr-1">
              <p
                className={`absolute bottom-[26px] text-[10px] bg-[#FFE500] font-bold left-[10px] text-red-500 rounded-full px-1`}
              >
                {cart?.length}
              </p>
              <FaShoppingCart size={28} color="#ffffff" className="self-end" />
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
