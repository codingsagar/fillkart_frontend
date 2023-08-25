import React from "react";
import Lottie from "lottie-react";
import PaymentSuccessAnimation from "../images/paymentsuccess.json";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-[80vh] flex justify-center items-center flex-col">
        <Lottie
          style={{ height: 300 }}
          animationData={PaymentSuccessAnimation}
          loop={true}
        />
        <p className="text-2xl font-bold text-green-500">Payment Successful !</p>
        <Link to="/orders">
        <button className="btn-primary my-5">Check your orders</button>
        </Link>
    </div>
  );
};

export default PaymentSuccess;
