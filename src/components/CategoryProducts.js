import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import Categories from "./Categories";
import ErrorPage from "../pages/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { allProducts } from "../features/product/productSlice";
import loadingData from "../images/data.json";
import Lottie from "lottie-react";
import { cartStateReset } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { Select } from "antd";
import {FaFunnelDollar} from "react-icons/fa";

function capatalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1, word.length);
}
const CategoryProducts = () => {
  const categories = [
    "clothes",
    "electronics",
    "shoes",
    "grocery",
    "furniture",
  ];
  const { products, isLoading } = useSelector((state) => state.product);
  const [priceFilter,setPriceFilter] = useState(null);


  const handleSelect = (value) => {
    setPriceFilter(value);
  };

  const dispatch = useDispatch();
  const { category } = useParams();
  useEffect(() => {
    dispatch(allProducts({category, price:priceFilter}));
  }, [category, dispatch, priceFilter]);

  const { isSuccess, message } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isSuccess) {
      dispatch(cartStateReset());
      if (message) {
        toast.success(message, { theme: "colored" });
      }
    }
  }, [isSuccess, dispatch, message]);


  const isGrocery = category === "grocery" ? true : false;

  if (isLoading) {
    return (
      <>
        <Categories />
        <h2 className="text-xl font-medium my-14 text-center">
          {capatalize(category)} Products
        </h2>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Lottie
            style={{ height: 120 }}
            animationData={loadingData}
            loop={true}
          />
          <span className="font-medium text-primary">Loading...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <Categories />
      <div className="flex flex-col items-center my-4 mb-20">
        {categories.includes(category) ? (
          <>
            <div className="flex items-center w-full justify-between px-2 md:w-[85%]">
              <h2 className="text-xl font-medium my-10">
                {capatalize(category)} Products
              </h2>
              <div className="flex items-center gap-x-2">
              <div className="hidden md:block">
              <FaFunnelDollar size={22} color="#222222"/>
              </div>
                <Select
                  defaultValue={priceFilter}
                  style={{ width: 120 }}
                  onChange={handleSelect}
                  placeholder="Sort by price"
                  options={[
                    { value: "lowToHigh", label: "Low to High" },
                    { value: "highToLow", label: "High to Low" },
                  ]}
                  allowClear={true}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-y-5 w-full justify-center sm:gap-x-20 sm:gap-y-8">
              {products?.map((item) => (
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
          </>
        ) : (
          <ErrorPage />
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
