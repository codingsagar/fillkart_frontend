import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartState } from "../contexts/CartContext";


const CartItem = ({ data }) => {
  const {dispatch} = CartState();
  return (
    <div className="flex border items-center rounded-md gap-x-1 relative max-w-[600px]">
      <Link to={`/product/${data.category}/${data.id}`}>
      <div className="w-24 h-24">
        <img
          src={data.image}
          alt={data.title}
          className="w-24 h-24 rounded-tl-md rounded-bl-md"
        />
      </div>
      </Link>
      <div className="flex items-center p-2">
        <div>
          <p className="font-medium text-sm">{(data.title).substring(0,50)}...</p>
          <p className="font-medium text-primary">₹ {data.price}</p>
          <p className="text-sm">Qty : 1</p>
        </div>
        <div className="absolute right-3 text-red-600 text-xl p-1 cursor-pointer border" onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:data})}>
          <AiFillDelete />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
