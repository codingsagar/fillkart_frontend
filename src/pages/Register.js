import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const username = "Karan";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("You are registerd successfully");
      navigate("/");
    }
    if(user){
      toast.success("You are already registered !");
      navigate('/');
    }

    dispatch(reset());


  }, [isError, isSuccess, user, navigate, dispatch, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name:username,
      email,
      password,
    };
    dispatch(register(userData));
  };

  if (isLoading) {
    return "Registering your account !";
  }
  return (
    <>
      <ToastContainer pauseOnFocusLoss position="top-center" autoClose={5000} />
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
                Register your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
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
                    value={password}
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
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
