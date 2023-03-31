import React from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import { HiArrowNarrowRight } from "react-icons/hi";

const PopularSection = ({ data }) => {
  const isGrocery = data[0].category === "grocery" ? true : false;
  return (
    <div className="my-16 grid items-center justify-center py-4 gap-y-10">
        <div className="flex items-center w-full justify-between px-3">
            <h2 className="text-xl font-semibold md:no-underline text-center md:text-left">
                Popular {data[0].category}
            </h2>
            <Link to={`/products/${data[0].category}`} className="flex items-center text-gray-700 gap-x-1 hover:text-primary-hover
            hover:bg-gray-200 p-2 rounded-md">
                    <span className="font-medium">
                         View more
                    </span>
                <HiArrowNarrowRight color="rgb(156,163,175)"/>
            </Link>
        </div>

      <div
        className="grid grid-cols-2 mx-2 md:gap-x-16 max-w-max gap-2 items-center
      md:flex md:flex-wrap md:mx-5"
      >
        {data.slice(0, 4).map((item) => (
          <ProductItem
            imageUrl={item.image}
            title={item.title}
            price={item.price}
            key={item.id}
            isGrocery={isGrocery}
            id={item.id}
            category={item.category}
          />
        ))}
      </div>
      <div className="my-7 md:ml-4 md:w-48">

      </div>
    </div>
  );
};

export default PopularSection;
