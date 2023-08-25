import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../features/product/productSlice";
import ProductItem from "./ProductItem";
import NoProducts from "../images/noproducts.json";
import loadingData from "../images/data.json";
import Lottie from "lottie-react";
import { cartStateReset } from "../features/cart/cartSlice";
import { toast } from "react-toastify";


const SearchedProducts = () => {
  const { searchQuery } = useParams();
  const dispatch = useDispatch();

  const { searchedProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(searchProducts(searchQuery));
  }, [dispatch, searchQuery]);

  const { isSuccess, message } = useSelector((state) => state.cart);


  useEffect(() => {
    if (isSuccess) {
      dispatch(cartStateReset());
      if (message) {
        toast.success(message, { theme: "colored" });
      }
    }
  }, [isSuccess, dispatch, message]);

  return (
    <div className="min-h-screen md:m-10">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-[80vh] flex-col">
          <Lottie
            animationData={loadingData}
            loop={true}
            style={{ height: 120 }}
          />
          <span className="font-medium text-primary">
            Searching, Please wait...
          </span>
        </div>
      ) : (
        <div>
          <h1 className="text-lg font-medium text-center my-10">
            Showing results for
            <span className="text-primary font-medium">{` ${searchQuery} `}</span>
            <span>({searchedProducts.length} products)</span>
          </h1>
          <div className="flex flex-wrap gap-y-5 w-full justify-center sm:gap-x-20 sm:gap-y-8">
            {searchedProducts?.map((product) => {
              return (
                <ProductItem
                  imageUrl={product.imageUrl}
                  title={product.name}
                  price={product.price}
                  isGrocery={product.category === "grocery" ? true : false}
                  id={product._id}
                  category={product.category}
                  key={product._id}
                />
              );
            })}
          </div>
          {searchedProducts.length === 0 ? (
            <div className="flex justify-center items-center w-full">
              <div>
                <Lottie
                  animationData={NoProducts}
                  loop={true}
                  style={{ height: 300 }}
                />
                <h1 className="text-primary font-bold text-xl text-center">
                  No products found !
                </h1>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchedProducts;