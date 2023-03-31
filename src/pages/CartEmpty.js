import React from "react";
import { CgShoppingCart } from "react-icons/cg";

const CartEmpty = () => {
  return (
    <div className="grid place-content-center min-h-[80vh] gap-y-2">
      <div className="ml-4 relative">
        <CgShoppingCart size={100} />
      </div>
      <h1 className="text-primary font-medium text-lg">Your cart is Empty !</h1>
    </div>
  );
};

export default CartEmpty;
