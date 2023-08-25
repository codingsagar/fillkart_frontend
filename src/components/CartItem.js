import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { removeFromCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex border items-center rounded-md gap-x-1 relative md:min-w-[400px]">
      <Link to={`/product/${data.category}/${data._id}`}>
        <div className="w-24 h-24">
          <img
            src={data.imageUrl}
            alt={data.name}
            className="w-24 h-24 rounded-tl-md rounded-bl-md"
          />
        </div>
      </Link>
      <div className="flex items-center p-2">
        <div>
          <Link to={`/product/${data.category}/${data._id}`}>
            <p className="font-semibold text-base">
              {data.name.substring(0, 40)}...
            </p>
          </Link>
          <p className="font-semibold text-primary">₹ {data.price}</p>
          <p className="text-sm">Qty : 1</p>
        </div>
        <button
          className="absolute right-3 text-red-600 text-xl p-1 cursor-pointer border mt-3"
          onClick={() => dispatch(removeFromCart(data._id))}
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
