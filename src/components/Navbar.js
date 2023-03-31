import React from "react";
import cartSvg from "../images/cart.svg";
import { Link } from "react-router-dom";
import { CartState } from "../contexts/CartContext";
import { CgMenu } from "react-icons/cg";
import SidebarComp from "./SidebarComp";
import { useProSidebar } from "react-pro-sidebar";



const Navbar = () => {
  
  const { cart } = CartState();
  const { toggleSidebar } = useProSidebar();


  let cartCount = cart.length;
  return (
    <>
    <SidebarComp/>
    <nav
      className="bg-primary h-[65px] flex items-center sticky top-0
    justify-evenly z-10"
    >
      <div className="cursor-pointer md:hidden" onClick={toggleSidebar}>
        <CgMenu  color="white" size={22}/>
      </div>
      <div className="flex gap-x-2 md:gap-x-7 ml-[-5px] items-center">
        <Link to="/">
          <div className="mt-0 sm:mt-[-7px] ml-2">
            <p className="text-white text-[20px] font-bold text-center">FillKart</p>
            <p className="text-[#FFE500] hidden sm:block text-[8px] mt-[-4px]">
              Buy more, spend less
            </p>
          </div>
        </Link>
        <div>
          <input
            type="search"
            name="search"
            id="search"
            className="w-[50vw] rounded-sm h-8 outline-none px-3 placeholder:text-xs"
            placeholder="Search for Products, Brands "
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <Link to="/login">
          <button className="text-primary font-medium h-8 w-20 bg-white hidden md:block rounded-sm ">Login</button>
        </Link>
        <Link to="/">
        <p className="text-white font-semibold hidden lg:block">Download app</p>
        </Link>
        <Link to="/cart">
          <div className="h-8 w-8 flex relative mr-1">
            <p className={`absolute bottom-[20px] text-sm text-[#FFE500] font-semibold left-[13px]`}>
              {cartCount > 99 ? "99+" : cartCount}
            </p>
            <img src={cartSvg} alt="" />
          </div>
        </Link>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
