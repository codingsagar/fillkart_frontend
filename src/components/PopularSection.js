import React from "react";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import loadingData from "../images/data.json";
import Lottie from "lottie-react";

const PopularSection = ({ category }) => {
  const { products, isLoading } = useSelector((state) => state.product);

  const productsCopy = products;

  const isGrocery = category === "grocery" ? true : false;

  if (isLoading) {
    return (
      <div className="h-56">
        <div className="flex flex-col justify-center items-center">
          <Lottie
            style={{ height: 120 }}
            animationData={loadingData}
            loop={true}
          />
          <span className="text-primary font-medium capitalize">
            Loading popular {category}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="my-16 grid items-center justify-center py-4 gap-y-10">
      <div className="flex items-center w-full justify-between px-3">
        <h2 className="text-xl font-semibold md:no-underline text-center md:text-left">
          Popular {category}
        </h2>
        <Link
          to={`/products/${category}`}
          className="flex items-center text-gray-700 gap-x-1 hover:text-primary-hover
            hover:bg-gray-200 p-2 rounded-md"
        >
          <span className="font-medium">View more</span>
          <HiArrowNarrowRight color="rgb(156,163,175)" />
        </Link>
      </div>

      <div className="flex flex-wrap gap-y-5 w-full justify-center sm:gap-x-20 sm:gap-y-8">
        {productsCopy
          ?.filter((item) => item.category === category)
          .slice(0, 4)
          .map((item) => (
            <ProductItem
              imageUrl={item.imageUrl}
              title={item.name}
              price={item.price}
              key={item._id}
              isGrocery={isGrocery}
              id={item._id}
              category={item.category}
              reviews={item.reviews}
            />
          ))}
      </div>
      <div className="my-7 md:ml-4 md:w-48"></div>
    </div>
  );
};

export default PopularSection;
