import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import NotFoundLottieData from "../images/not-found.json";

const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-10 mb-24">
        <Lottie
        animationData={NotFoundLottieData}
        loop={true}
        style={{height:300}}
      />
        <div className="flex flex-col items-center text-center">
          <div className="my-5">
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
