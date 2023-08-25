import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chart from "react-apexcharts";

import {
  getProductCount,
  productStateReset,
} from "../features/product/productSlice";

const AdminPieChart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCount());
    return () => {
      dispatch(productStateReset());
    };
  }, [dispatch]);

  const { productCount } = useSelector((state) => state.product);


  const categories = productCount.map((item) => {
    const capital = item._id.slice(0, 1).toUpperCase();
    const capitalCategory = capital + item._id.slice(1);

    return capitalCategory;
  });
  const quantities = productCount.map((item) => item.quantity);

  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: categories,
      },
    },
    series: [
      {
        name: "Stock left",
        data: quantities,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-y-3 my-10 border-2 rounded">
      <h2 className="text-xl font-bold p-4">Inventory Count</h2>
      <div className="lg:w-[50%] my-10 w-[86vw]">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
        />
      </div>
    </div>
  );
};

export default AdminPieChart;
