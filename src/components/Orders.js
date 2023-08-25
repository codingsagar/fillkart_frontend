import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrders, orderStateReset } from "../features/orders/orderSlice";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import Lottie from "lottie-react";
import DeliveryLottieData from "../images/delivery.json";
const Orders = () => {
  const dispatch = useDispatch();

  const { userOrders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {

    if(user){
      dispatch(getUserOrders());
    }

    return () => {
      dispatch(orderStateReset());
    };
  }, [dispatch,user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center my-16">
        <Lottie
          style={{ height: 220 }}
          animationData={DeliveryLottieData}
          loop={true}
        />
        <p className="mb-10 font-bold text-center my-10 text-xl mx-5 text-primary">
          <Link to="/login" className="underline underline-offset-1">
            Login
          </Link>{" "}
          into your account to see your orders !
        </p>
      </div>
    );
  }

  if(!userOrders){
    return (
      <h1 className="font-bold text-2xl flex justify-center items-center min-h-[70vh]">No orders found !</h1>
    )
  }

  return (
    <div className="min-h-[80vh] mx-2 md:mx-10 mt-4 md:mt-10 flex justify-between">
      <div className="lg:w-[50vw] w-full">
        <h1 className="font-bold text-xl">
          My Orders - <Badge count={userOrders?.items?.length} />
        </h1>
        <div className="flex flex-col gap-y-4 my-5">
          {userOrders?.items?.map(({ productId }) => (
            <div
              className="flex border items-center rounded-md gap-x-1 relative max-w-lg shadow-md hover:shadow-lg transition-shadow"
              key={productId._id}
            >
              <Link to={`/product/${productId.category}/${productId._id}`}>
                <div className="w-24 h-24 bg-white">
                  <img
                    src={productId.imageUrl}
                    alt={productId.name}
                    className="w-24 h-24 rounded-tl-md rounded-bl-md"
                  />
                </div>
              </Link>
              <div className="flex items-center p-2">
                <div>
                  <Link to={`/product/${productId.category}/${productId._id}`}>
                    <p className="font-semibold text-base">
                      {productId.name}
                    </p>
                  </Link>
                  <p className="font-semibold text-primary">
                    ₹ {productId.price}
                  </p>
                  <p className="text-sm">Qty : 1</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="self-start mt-20 hidden lg:block justify-self-center w-[50%]">
        <Lottie
          style={{ height: 220 }}
          animationData={DeliveryLottieData}
          loop={true}
        />
        <p className="text-center font-extrabold text-primary my-3">
          Your orders will get delivered soon.
        </p>
      </div>
    </div>
  );
};

export default Orders;
