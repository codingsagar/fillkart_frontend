import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ imageUrl, title, price, isGrocery, id, category }) => {
  return (
    <Link to={`/product/${category}/${id}`}>
    <div
      className="border border-[1.2px] rounded-md shadow-sm max-w-max cursor-pointer hover:scale-105 transition-transform
      duration-500 hover:shadow-md"
    >
      <img
        src={imageUrl}
        alt={title}
        className={`${
            isGrocery ? "scale-75" : null
        } rounded-t-md border-b w-48 h-48`}
      />
      <div className="my-2 mx-2 py-1">
        <p className="text-xs mt-2 font-medium text-[#333333] mb-2">
          {title.substring(0, 22)}...
        </p>
        <span className="text-sm font-bold text-primary">₹{price}</span>
      </div>
    </div>
    </Link>
  );
};

export default ProductItem;