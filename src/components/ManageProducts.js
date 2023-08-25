import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { allProducts,productStateReset } from "../features/product/productSlice";
import { AiFillEdit } from "react-icons/ai";
import { Table } from "antd";
import { LoadingScreen } from "./LoadingScreen";


const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "_id",
    render: (text) => <span className="break-all">{text}</span>,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "_id",
    render: (text) => <span className="capitalize">{text}</span>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "_id",
    render: (text) => <span className="capitalize">₹{text}</span>,
  },
  {
    title: "Edit",
    dataIndex: "_id",
    key: "_id",
    render: (_, record) => (
      <Link
        to={`edit/${record._id}`}
        className="text-primary font-medium flex gap-x-1 w-max hover:text-primary-hover"
      >
        <AiFillEdit size={20} /> Edit
      </Link>
    ),
  },
];

const ManageProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    document.title = "Manage Products - Admin Dashboard";
    dispatch(allProducts({}));
    return ()=>{
      dispatch(productStateReset());
    }
  }, [dispatch]);

  if (isLoading) return <LoadingScreen />;


  return (
    <div className="lg:p-10 px-2 py-5 bg-gray-100">
      <div className="flex items-center gap-x-2">
        <h2 className="font-semibold text-xl">Manage Products</h2>
        <h2 className="rounded-md text-xs text-white font-medium bg-red-600 px-2 py-1">
          {products?.length} products
        </h2>
      </div>

      <Link to="new" className="w-max flex">
        <button className="btn-primary flex items-center gap-x-2 hover:bg-primary-hover transition-colors my-5">
          <GoPlus size={15} color="#ffffff" />
          Add Product
        </button>
      </Link>
      {products?.length > 0 ? (
        <Table
          columns={columns}
          dataSource={products}
          scroll={{ scrollToFirstRowOnChange: true }}
          rowKey={(record) => record._id}
          bordered={true}
          loading={isLoading}
        />
      ) : (
        <h1 className="font-bold text-2xl">No product found 😲</h1>
      )}
    </div>
  );
};

export default ManageProducts;
