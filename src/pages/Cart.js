import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import CartEmpty from "../pages/CartEmpty";
import { IoBagCheck } from "react-icons/io5";
import loginToContinue from "../images/loginToContinue.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartStateReset } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { FaStripe } from "react-icons/fa";
import poweredByStripeWhite from "../images/poweredbystripe-white.svg";

const Cart = () => {
  const checkOurUrl =
    "http://localhost:5200/api/stripe/create-checkout-session";

  const dispatch = useDispatch();

  const { cart, isSuccess, message } = useSelector((state) => state.cart);

  const [stripeLoading, setStripeLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && message) {
      message === "Product added to cart."
        ? toast.success(message, { theme: "colored", autoClose: 1200 })
        : toast.info(message, { theme: "colored", autoClose: 1200 });
    }
    dispatch(cartStateReset());
  }, [isSuccess, dispatch, message]);

  const handleCheckOut = async (checkOurUrl) => {
    setStripeLoading(true);
    const axiosInstance = axios.create({ withCredentials: true });
    const response = await axiosInstance.post(checkOurUrl);
    window.location = response.data.url;
  };

  var total = 0;

  for (let index = 0; index < cart.length; index++) {
    const cartItem = cart[index];
    const price = cartItem?.productId.price;
    total += price;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center my-16">
        <img
          src={loginToContinue}
          alt="Login to continue illustration"
          className="h-64"
        />
        <p className="mb-10 font-bold text-center my-10 text-xl mx-5 text-primary">
          Please, 
          {" "}
          <Link to="/login" className="underline underline-offset-1">
            Login
          </Link>{" "}
          to add products to your cart.🛒
        </p>
      </div>
    );
  }

  if (stripeLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <span className="text-lg font-medium mx-2">Redirecting you to</span>
        <FaStripe size={50} color="#5433FF" />
      </div>
    );
  }

  return cart.length ? (
    <div className="mx-5 min-h-[70vh] my-10 flex flex-col md:flex-row md:justify-between">
      <div className="my-4 flex flex-col gap-y-5">
        <h2 className="text-xl font-medium">
          Your Cart (
          {cart?.length > 1
            ? `${cart?.length} items`
            : `${cart?.length} 
      item`}
          )
        </h2>
        {cart.map((item, index) => {
          return <CartItem data={item.productId} key={index} />;
        })}
      </div>
      <div className="md:fixed md:right-10 md:my-5 px-8 py-5 border shadow-sm rounded-md bg-primary text-white">
        <p className="font-bold text-lg">Total Amount - ₹ {total}</p>
        <button
          className="btn-white mt-5 flex items-center gap-x-2"
          onClick={() => handleCheckOut(checkOurUrl)}
        >
          Checkout <IoBagCheck />
        </button>

        <Link to="https://www.stripe.com" target="_blank">
          <img src={poweredByStripeWhite} alt="" width={100} className="mt-5" />
        </Link>
      </div>
    </div>
  ) : (
    <CartEmpty />
  );
};

export default Cart;
