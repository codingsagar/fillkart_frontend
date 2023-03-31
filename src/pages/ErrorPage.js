import React from "react";
import ErrorImage from "../images/error.svg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-10 mb-24">
        <img src={ErrorImage} alt="" className="h-56" />
        <div className="mx-2">
          <div className="my-3">
            <h2 className="text-xl font-semibold text-[#3A1CB0]">
              Sorry, we couldn’t find it
            </h2>
            <p className="text-[#3A1CB0] font-normal">
              The resource you are looking for doesn’t exist.
            </p>
          </div>
          <div className="flex gap-x-5">
            <Link to="/">
              <button className="btn-primary">Visit homepage</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
