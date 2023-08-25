import React from "react";
import PaymentFailureAnimation from "../images/paymentfailure.json";
import Lottie from "lottie-react";

const PaymentFailure = () => {
  return (
    <div className="min-h-[80vh] flex justify-center items-center flex-col">
      <Lottie
        animationData={PaymentFailureAnimation}
        loop={true}
        style={{ height: 350 }}
      />
      <p className="text-2xl font-bold text-red-500">
        Sorry, Payment Failed ! Try again
      </p>
    </div>
  );
};

export default PaymentFailure;
