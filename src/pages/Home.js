import React from "react";
import Categories from "../components/Categories";
import Slider from "../components/Slider";
import TopBrands from "../components/TopBrands";
import PopularSection from "../components/PopularSection";
import AppDownload from "../components/AppDownload";

const Home = ({data}) => {
  return (
    <>
      <Categories />
      <Slider />
      <TopBrands />
      <PopularSection data={data.clothes} />
      <PopularSection data={data.electronics} />
      <PopularSection data={data.furniture} />
      <PopularSection data={data.shoes} />
      <PopularSection data={data.grocery} />
      <AppDownload />
    </>
  );
};

export default Home;