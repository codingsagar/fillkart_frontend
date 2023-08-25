import React,{useEffect} from "react";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import TopBrands from "../components/TopBrands";
import PopularSection from "../components/PopularSection";
import AppDownload from "../components/AppDownload";
import { allProducts } from "../features/product/productSlice";
import { useDispatch,useSelector } from "react-redux";
import { cartStateReset, resetCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { getCartData } from "../features/cart/cartSlice";
import { GeneralFAQ } from "../components/GeneralFAQ";

const Home = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.auth);
  
  useEffect(() => {
  dispatch(allProducts({}));
  if(user){
    dispatch(getCartData());
  }
  else{
    dispatch(resetCart());
  }
  }, [dispatch,user])

  const {isSuccess,message} = useSelector(state=>state.cart);

  useEffect(() => {
    if(isSuccess && message){
      message==="Product added to cart."?
      (
        toast.success(message,{theme:"colored",autoClose:1200})
      ):
      (
        toast.info(message,{theme:"colored",autoClose:1200})
      )
    }    
    dispatch(cartStateReset());
  }, [isSuccess,dispatch,message])
  
  return (
    <>
      <Categories />
      <Slider />
      <TopBrands />
      <PopularSection category="clothes" />
      <PopularSection category="electronics" />
      <PopularSection category="furniture" />
      <PopularSection category="shoes" />
      <PopularSection category="grocery" />
      <GeneralFAQ />
      <AppDownload />
    </>
  );
};

export default Home;