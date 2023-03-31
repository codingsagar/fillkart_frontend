import React from "react";
import { useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import Categories from "./Categories";
import ErrorPage from "../pages/ErrorPage";

function capatalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1, word.length);
}

const CategoryProducts = ({ data }) => {
  const { category } = useParams();
  const isGrocery = category === "grocery" ? true : false;
  return (
    <>
      <Categories />
      <div className="flex flex-col items-center my-5 mb-20">
        {data[category] ? (
          <>
            <h2 className="text-xl font-medium my-10">
              {capatalize(category)} Products
            </h2>
            <div className="grid grid-cols-2 mx-2 gap-2 sm:flex sm:justify-center sm:gap-x-20 sm:gap-y-8 sm:flex-wrap">
              {data[category].map((item) => (
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
          </>
        ) : (
          <ErrorPage />
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
