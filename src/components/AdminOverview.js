import React, { useEffect } from "react";
import { GrMoney, GrLineChart } from "react-icons/gr";
import { BsCartCheckFill } from "react-icons/bs";
import AdminPieChart from "./AdminPieChart";
import { useSelector, useDispatch } from "react-redux";
import { getSalesData, orderStateReset } from "../features/orders/orderSlice";
import { Spin } from "antd";

const AdminOverview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalesData());
    return () => {
      dispatch(orderStateReset());
    };
  }, [dispatch]);

  const { totalSales, lastOrderValue, totalOrders, isLoading } = useSelector(
    (state) => state.order
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen gap-x-2">
        <Spin />
        Loading...
      </div>
    );
  }

  return (
    <div className="h-min-screen p-5">
      <h2 className="font-medium text-3xl mb-5">Overview</h2>
      <div className="flex md:gap-x-5 flex-col gap-y-4 md:flex-row md:gap-y-0">
        <div className="bg-[#c5e5f0] h-36 min-w-[220px] rounded flex flex-col p-6 justify-center gap-y-5 shadow-md">
          <div className="inline-flex gap-x-2">
            <GrMoney
              size={30}
              color="#232323"
              style={{
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
            <h3 className="text-base font-semibold self-center">Total Sales</h3>
          </div>
          <div>
            <p className="text-2xl font-extrabold">₹{totalSales}</p>
          </div>
        </div>
        <div className="bg-yellow-200 h-36 min-w-[220px] rounded flex flex-col p-6 justify-center gap-y-5 shadow-md">
          <div className="inline-flex gap-x-2">
            <GrLineChart
              size={30}
              color="#232323"
              style={{
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
            <h3 className="text-base font-semibold self-center">
              Total Orders
            </h3>
          </div>
          <div>
            <p className="text-2xl font-extrabold">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-green-200 h-36 min-w-[220px] rounded flex flex-col p-6 justify-center gap-y-5 shadow-md">
          <div className="inline-flex gap-x-2">
            <BsCartCheckFill
              size={30}
              color="#232323"
              style={{
                backgroundColor: "white",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
            <h3 className="text-base font-semibold self-center">Last order</h3>
          </div>
          <div>
            <p className="text-2xl font-extrabold">₹{lastOrderValue}</p>
          </div>
        </div>
      </div>
      <div>
        <AdminPieChart key="something123!@#" />
      </div>
    </div>
  );
};

export default AdminOverview;
