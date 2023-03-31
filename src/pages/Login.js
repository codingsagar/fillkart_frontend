import React, { useState} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const Login = () => {

  const successNotify = () =>
    toast.success("Logged in  successfully !", {
      position: "top-center",
      autoClose:3000
    });
  const errorNotify = (message) =>
    toast.error(message, { position: "top-center" ,autoClose:2000});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <>
      <ToastContainer pauseOnFocusLoss position="top-center" autoClose={3000} />
    <section className="bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <div className={`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 `}>
        <div className="w-full bg-white rounded-lg shadow-lg border-2 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 invalid:outline-red-600 valid:outline-green-400"
                  placeholder="name@company.com"
                  required=""
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
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
