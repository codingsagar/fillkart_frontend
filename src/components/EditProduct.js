import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductWithId,
  deleteProduct,
} from "../features/product/productSlice";
import { toast } from "react-toastify";
import { productStateReset } from "../features/product/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { Modal } from "antd";

const EditProduct = () => {
  let chalnaHa = useRef(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [modal2Open, setModal2Open] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const { error, message, product, isLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProductWithId(productId));

    if (chalnaHa && message) {
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
        navigate(-1);
      }
    }
    dispatch(productStateReset());

    return () => {
      chalnaHa.current = false;
    };
  }, [message, error, navigate, dispatch, productId]);

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("imageUrl", product.imageUrl);
      setValue("category", product.category);
    }
  }, [product, setValue]);

  const onSubmit = (productData) => {
    const productIdAndData = { id: productId, ...productData };
    dispatch(updateProduct(productIdAndData));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (product) {
    return (
      <div className="lg:m-10 mx-3 my-5">
        <button
          className="flex items-center gap-x-1 text-primary w-max"
          onClick={() => navigate(-1)}
        >
          <IoArrowBackOutline />
          Back
        </button>
        <h2 className="my-6 font-semibold text-xl">Edit product</h2>
        <form noValidate={true} onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="eg. Iphone 6 Pro 256GB"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 pt-2 text-sm">
                Product name is required !
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light resize-none"
              {...register("description", {
                required: true,
              })}
              placeholder="Write details about the product"
              rows={6}
            />
            {errors.description?.type === "required" && (
              <p className="text-red-500 pt-2 text-sm">
                Product description is required !
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Price{" "}
              <span className="text-[10px] text-gray-500">
                (Enter in dollar)
              </span>
            </label>
            <input
              type="number"
              id="price"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light resize-none"
              name="price"
              {...register("price", {
                required: true,
                maxLength: 8,
                min: 0,
              })}
              placeholder="eg $222"
            />
            {errors.price?.type === "required" && (
              <p className="text-red-500 pt-2 text-sm">
                Product price is required !
              </p>
            )}
            {errors.price?.type === "maxLength" && (
              <p className="text-red-500 pt-2 text-sm">
                Product price cannot exceed 8 digits.
              </p>
            )}
            {errors.price?.type === "min" && (
              <p className="text-red-500 pt-2 text-sm">
                Product price cannot be less than 0.
              </p>
            )}
          </div>
          <div className="mb-6">
            {watch("imageUrl") ? (
              <img
                src={watch("imageUrl")}
                alt="Wrong Url"
                width={150}
                height={100}
                className="my-5 border border-black rounded-sm"
              />
            ) : null}
            <label
              htmlFor="imageUrl"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Image Url{" "}
              <span className="text-[10px] text-gray-500">
                (Paste the image url and you will be able to see it appearing
                above if correct. Upload feature will be available soon)
              </span>
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              {...register("imageUrl", {
                required: true,
              })}
              placeholder="Paste the product image url"
            />
            {errors.imageUrl?.type === "required" && (
              <p className="text-red-500 pt-2 text-sm">
                Product Image is required !
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Category
            </label>
            <select
              id="category"
              category="category"
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("category", {
                required: true,
              })}
            >
              <option value="">Choose a category</option>
              <option value="clothes">Clothes 👔</option>
              <option value="electronics">Electronics ⚡</option>
              <option value="shoes">Shoes 👟</option>
              <option value="furniture">Furniture 🪑</option>
              <option value="grocery">Grocery 🧋</option>
            </select>

            {errors.category?.type === "required" && (
              <p className="text-red-500 pt-2 text-sm">
                Product category is required !
              </p>
            )}
          </div>
          <div className="flex gap-x-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Product
            </button>
            <button
              className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick ={() => setModal2Open(true)}
              type="button"
            >
              Delete Product
            </button>
          </div>
        </form>

        <Modal
          title="Are you sure you want to delete this product ?"
          centered
          open={modal2Open}
          onOk={() => dispatch(deleteProduct(productId))}
          onCancel={() => setModal2Open(false)}
          okText="Delete Product"
          okButtonProps={{
            style: { backgroundColor: "#F44336", color: "white" },
          }}
        >
          <p className="my-5">You are going to delete <span className="font-medium">{product.name}</span></p>
        </Modal>
      </div>
    );
  }
};

export default EditProduct;
