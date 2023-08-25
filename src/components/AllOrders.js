import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, orderStateReset } from "../features/orders/orderSlice";
import { Table } from "antd";
import { LoadingScreen } from "./LoadingScreen";

const columns = [
  {
    title: "Order Id",
    dataIndex: "_id",
    key: "_id",
    render: (text) => <span className="break-all">{text}</span>,
  },
  {
    title: "User email",
    dataIndex: "userId",
    key: "_id",
    render: (text) => (
      <span className="break-all">{text ? text.email : "Account Deleted"}</span>
    ),
  },
  {
    title: "Order Value",
    dataIndex: "orderValue",
    key: "_id",
    render: (text) => <span>₹{text / 100}</span>,
  },
  {
    title: "Edit",
    dataIndex: "_id",
    key: "_id",
    render: (_, record) => (
      <button
        type="button"
        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
      >
        Finish Order
      </button>
    ),
  },
];

const AllOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());

    return () => {
      dispatch(orderStateReset());
    };
  }, [dispatch]);

  useEffect(() => {
    document.title = "Manage Orders - Admin Dashboard";
  }, []);

  const { allOrders, isLoading } = useSelector((state) => state.order);

  

  if (isLoading) return <LoadingScreen />;  

  return (
    <div className="text-gray-900 bg-gray-100 lg:p-10 min-h-screen p-4">
      <div className="flex">
        <h1 className="text-xl font-bold">All Orders</h1>
      </div>
      <div className="py-4 ">
        {allOrders?.length > 0 ? (
          <Table
            columns={columns}
            dataSource={allOrders}
            rowKey={(record) => record._id}
            bordered={true}
          />
        ) : (
          <h1 className="font-bold text-2xl">No Orders found 😲</h1>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
