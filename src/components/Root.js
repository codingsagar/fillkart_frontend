import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { ScrollRestoration } from "react-router-dom";

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration/>
    </>
  );
};

export default Root;
