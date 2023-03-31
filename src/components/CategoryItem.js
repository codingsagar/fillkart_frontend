import React from "react";
import { Link } from "react-router-dom";


function capatalize(word) {
  return word.charAt(0).toUpperCase()+word.slice(1,word.length);
}

const CategoryItem = (props) => {

  return (
    <Link to={`/products/${props.type}`}>
      <div className="flex flex-col items-center">
        <img src={props.image} alt="" className="h-11 w-11 rounded-full" />
        <p className="text-[11px] font-semibold text-center mt-1">
          {capatalize(props.type)}
        </p>
      </div>
    </Link>
  );
};

export default CategoryItem;