import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  reset,
  updateUserRole,
  deleteUser,
} from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { Table, Modal, Select } from "antd";
import { MdDelete } from "react-icons/md";
import { LoadingScreen } from "./LoadingScreen";

const ManageUsers = () => {
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);
  const [deleteEmail, setDeleteEmail] = useState(null);

  const { allUsers, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getAllUsers());
    if (isSuccess) {
      toast.success(message);
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, message]);

  const [modal2Open, setModal2Open] = useState(false);

  useEffect(() => {
    document.title = "Manage Users - Admin Dashboard";
  }, []);

  if (isLoading) return <LoadingScreen />;

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "_id",
      render: (text) => <p className="capitalize break-all">{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "_id",
      render: (email) => <span className="break-all">{email}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "_id",
      render: (role, record) => (
        <Select
          defaultValue={role}
          style={{ width: "fit-content" }}
          placeholder="Set user role"
          onChange={(value) =>
            dispatch(updateUserRole({ _id: record._id, role: value }))
          }
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
          ]}
          disabled={record.email === "sagar@fillkart.com"}
        />
      ),
    },
    {
      title: "Joined on",
      dataIndex: "createdAt",
      key: "_id",
      render: (date) => (
        <span>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      title: "Edit",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <>
          <button
            type="button"
            className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline hidden md:block"
            onClick={() => {
              setDeleteId(record._id);
              setDeleteEmail(record.email);
              setModal2Open(true);
            }}
          >
            Delete
          </button>

          <button
            type="button md:hidden"
            onClick={() => {
              setDeleteId(record._id);
              setDeleteEmail(record.email);
              setModal2Open(true);
            }}
          >
            <MdDelete size={20} color="red" className="md:hidden" />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="text-gray-900 bg-gray-100 lg:p-10 px-2 py-5">
      <div className="flex items-center gap-x-2">
        <h1 className="text-xl font-bold">Manage Users</h1>
        <h2 className="rounded-md text-xs text-white font-medium bg-red-600 px-2 py-1">
          {allUsers?.length} users
        </h2>
      </div>
      <div className="lg:py-4 py-2">
        {allUsers?.length > 0 ? (
          <Table
            columns={columns}
            dataSource={allUsers}
            size="small"
            rowKey={(record) => record._id}
            bordered={true}
            style={{ fontSize: "10px" }}
          />
        ) : (
          <h1 className="font-bold text-2xl">No users found 😲</h1>
        )}

        <Modal
          title="Are you sure you want to delete this user ?"
          centered
          open={modal2Open}
          onOk={() => {
            dispatch(deleteUser(deleteId));
            setModal2Open(false);
          }}
          onCancel={() => setModal2Open(false)}
          okText="Delete"
          okButtonProps={{
            style: { backgroundColor: "#F44336", color: "white" },
          }}
        >
          <p className="my-5">
            You are going to delete{" "}
            <span className="font-medium">{deleteEmail}</span>
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default ManageUsers;
