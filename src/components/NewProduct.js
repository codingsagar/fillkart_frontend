import React, {useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { newProduct } from "../features/product/productSlice";
import { toast } from "react-toastify";
import { productStateReset } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
import {IoArrowBackOutline} from "react-icons/io5";

const NewProduct = () => {
  let chalnaHa = useRef(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message } = useSelector((state) => state.product);

  useEffect(() => {
    if (chalnaHa && message) {
      if (error) {
        toast.error(message);
      } else {
        toast.success(message);
      }
    }
    dispatch(productStateReset());

    return () => {
      chalnaHa.current = false;
    };
  }, [message, error, dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();


  const onSubmit = (productData) => {
    dispatch(newProduct(productData));
    reset();
  };

  return (
    <div className="lg:m-10 mx-3 my-5">
      <button
        className="flex items-center gap-x-1 text-primary w-max"
        onClick={() => navigate(-1)}
      >
        <IoArrowBackOutline />
        Back
      </button>
      <h2 className="my-6 font-semibold text-xl">Add new product</h2>
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
            <p className="text-red-500 pt-2 text-sm">Product name is required !</p>
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
            <p className="text-red-500 pt-2 text-sm">Product description is required !</p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Price{" "}
            <span className="text-[10px] text-gray-500">(Enter in INR)</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            {...register("price", {
              required: true,
              maxLength:8,
              min:0
            })}
            placeholder="eg ₹ 222"
          />
           {errors.price?.type === "required" && (
            <p className="text-red-500 pt-2 text-sm">Product price is required !</p>
          )}
           {errors.price?.type === "maxLength" && (
            <p className="text-red-500 pt-2 text-sm">Product price cannot exceed 8 digits.</p>
          )}
           {errors.price?.type === "min" && (
            <p className="text-red-500 pt-2 text-sm">Product price cannot be less than 0.</p>
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
            <p className="text-red-500 pt-2 text-sm">Product Image is required !</p>
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
            <p className="text-red-500 pt-2 text-sm">Product category is required !</p>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
