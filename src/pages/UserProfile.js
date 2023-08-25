import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const chalnaHa = useRef(true);

  useEffect(() => {
    if (!user && chalnaHa.current) {
      toast.error("You are not logged in!");
      navigate("/login");
    }

    return () => (chalnaHa.current = false);
  }, [navigate, user]);

  return (
    <div className="min-h-[60vh] mx-5 my-12 md:m-10">
      <div className="bg-white overflow-hidden shadow-lg rounded-lg border-2">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-2xl leading-6 font-medium text-primary">
          {
            user?.role === "admin" ? "Welcome, Admin" : "Your Profile"
          }
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is your data we have collected while registering.
          </p>
          {user?.role === "admin" ? (
            <Link to="/admin/dashboard">
            <button
              className="text-white bg-primary font-medium py-2 px-3 md:block rounded-sm my-5"
            >
              Admin Dashboard
            </button>
            </Link>
          ) : null}
        </div>

        <div className="border-t border-gray-200 px-4 pb-5 sm:p-0">
          <div className="sm:mt-5 sm:ml-5 md:mt-5 md:ml-5">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name}`}
              alt="User Profile"
              className="rounded-full"
            />
          </div>
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Role
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {user?.role}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                -
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                -
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
