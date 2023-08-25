import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSideBar />
        <div className="lg:ml-60 lg:flex-grow w-full">
          <Outlet />
        </div>
      </div>
      <ScrollRestoration />
    </>
  );
};

export default AdminLayout;
