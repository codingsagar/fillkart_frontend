import React from "react";
import CategoryItem from "./CategoryItem";
import CategoryData from "../fake_data/categories";

const Categories = () => {

  return (

    <div className="flex justify-around shadow-xl items-center h-20 pt-2 pb-1">
        {
            CategoryData.map(item=><CategoryItem image={item.imageUrl} type={item.type} key={item.type}/>)  
        }
    </div>
  );
};

export default Categories;
