import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import { CartState } from "../contexts/CartContext";
import CartEmpty from "../pages/CartEmpty";
import {IoBagCheck} from "react-icons/io5";
import {NewCart} from "../components/NewCart";


const Cart = () => {
  const { cart } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price), 0));
  }, [cart]);
  return (
    cart.length?
        <div className="mx-5 min-h-[70vh] my-10">
          <div className="my-4 flex flex-col gap-y-5">
            <h2 className="text-xl font-medium">Your Cart ({cart.length > 1 ?`${cart.length} items`:`${cart.length} 
      item`})</h2>
            {cart.map((item, index) => (
                <CartItem data={item} key={index} />
            ))}
          </div>
          <div>
            <p className="font-medium mt-5 text-lg">Your total - ₹ {total}</p>
            <button className="btn-primary mt-2 flex items-center gap-x-2">Checkout <IoBagCheck/></button>
          </div>
        </div>:
    <CartEmpty/>
  );
};

export default Cart;
