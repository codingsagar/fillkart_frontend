import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset as resetUserState } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { AiFillHome } from "react-icons/ai";
import AdminSideBarMobile from "./AdminSidebarMobile";
import { GiHamburgerMenu } from "react-icons/gi";

const AdminNavbar = () => {
  const { user, message, isSuccess, isError } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const chalnaHa = useRef(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (chalnaHa.current && isSuccess) {
      dispatch(resetUserState);
    } else if (chalnaHa.current && isError) {
      toast.error(message);
      dispatch(resetUserState);
    }
  }, [message, dispatch, isSuccess, isError]);

  return (
    <>
      <nav
        className="bg-primary h-[65px] flex  items-center sticky top-0
    justify-evenly z-10 px-2 md:px-5 lg:px-10"
      >
        <GiHamburgerMenu size={26} color="white" className="mr-2 lg:hidden" onClick={()=>setOpen(true)}/>
        <div className="flex items-center justify-between w-full">
          <Link to="/admin/dashboard">
            <div>
              <p className="text-white text-[20px] font-bold text-center">
                FillKart Admin Dashboard
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-x-5">
            <div>
              <Link to="/">
                <AiFillHome size={28} color="white" />
              </Link>
            </div>
            {user ? (
              <button
                className="text-red-500 font-medium h-8 w-20 bg-white hidden md:block rounded-sm "
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </nav>
      <AdminSideBarMobile open={open} setOpen={setOpen} />
    </>
  );
};

export default AdminNavbar;
