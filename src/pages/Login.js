import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  login as LoginUser,
  reset as resetUserState,
} from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const chalnaHa = useRef(true);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("You have logged in successfully !", { autoClose: 1000 });
      navigate("/");
    }

    if (user && chalnaHa.current) {
      toast.success("You are already logged in !", { autoClose: 1000 });
      navigate("/");
    }

    dispatch(resetUserState());

    return () => {
      chalnaHa.current = false;
    };
  }, [isError, isSuccess, user, navigate, message, dispatch, reset]);

  useEffect(() => {
    document.title = "Login Page - Fillkart";
  }, []);

  const onSubmit = (data) => {
    dispatch(LoginUser(data));
    reset();
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
        <div
          className={`flex flex-col items-center justify-center px-6 py-8 mx-auto 
          h-[80vh] md:h-screen lg:py-0 `}
        >
          <div className="w-full bg-white rounded-lg shadow-lg border-2 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                noValidate={true}
                onSubmit={handleSubmit(onSubmit)}
              >
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 invalid:outline-red-600 valid:outline-green-400"
                    placeholder="name@company.com"
                    {...register("email", {
                      required: true,
                      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    })}
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
                    id="password"
                    autoComplete="on"
                    {...register("password", { required: true, minLength: 8 })}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
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
                  className="w-full text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary hover:bg-primary-hover transition-colors"
                >
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-primary "
                  >
                    Register
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

export default Login;
