import React from "react";
import { Link } from "react-router-dom";

const PopularItem = ({ imageUrl ,title,isGrocery, id, category }) => {
  return (
    <Link to={`/product/${category}/${id}`}>
    <div
      className={`${isGrocery?"bg-white":null} border rounded-md shadow-sm max-w-max cursor-pointer `}
    >
      <div>
        <img
            src={imageUrl}
            alt={title}
            className={`${
                isGrocery ? "scale-75" : null
            } rounded-md w-48 h-48 md:w-56 md:h-60 border-b`}
        />
      </div>

    </div>
    </Link>
  );
};

export default PopularItem;
