import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register as registerUser, reset as resetUserState } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";

import RegisterLottieData from "../images/registered.json";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const effectRan = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [lottie, setLottie] = useState(false);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      setLottie(true);
    }

    if (effectRan.current === false) {
      if (user) {
        toast.success("You are already registerd !");
        navigate("/");
      }
    }

    dispatch(resetUserState());

    return () => {
      effectRan.current = true;
    };
  }, [isError, isSuccess, user, message, dispatch,navigate]);

  useEffect(() => {
    document.title = "Register your account - Fillkart";
  }, [])
  

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    reset()
  };

  if (lottie === true) {
    return (
      <div className="min-h-screen grid place-content-center">
        <Lottie
          style={{ height: 450 }}
          animationData={RegisterLottieData}
          loop={false}
          onComplete={() => {
            navigate("/");
          }}
        />
      </div>
    );
  }
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
        <div
          className={`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 `}
        >
          <div
            className="w-full bg-white rounded-lg shadow-lg border-2 dark:border md:mt-0 sm:max-w-md 
      xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register a new account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                noValidate={true}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", { required: true, minLength: 3 })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-500 pt-2">Name is required</p>
                  )}
                  {errors.name?.type === "minLength" && (
                    <p className="text-red-500 pt-2">
                      Minimum length of name must be 3.
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", {
                      required: true,
                      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  {errors.email?.type === "pattern" && (
                    <p className="text-red-500 pt-2">
                      Please, enter a valid email.
                    </p>
                  )}
                  {errors.email?.type === "required" && (
                    <p className="text-red-500 pt-2">Email is required</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    {...register("password", { required: true, minLength: 8 })}
                    id="password"
                    autoComplete="on"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-500 pt-2">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-500 pt-2">
                      The minimum length of password must be 8.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  bg-primary hover:bg-primary-hover transition-colors"
                >
                  Register
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account ?{" "}
                  <Link
                    to="/login"
                    className="font-medium hover:underline
                  text-primary"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
