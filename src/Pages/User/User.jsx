import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function User() {
  const userData = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();

  return (
    <HomeLayout>
      <div className=" min-h-[90vh] flex items-center justify-center ">
        <div className=" my-10 flex flex-col gap-4 rounded-lg-4 p-4 text-white w-96 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            className=" w-40 m-auto rounded-full border border-black"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.username}
          </h3>
          <div className=" grid grid-cols-2">
            <p>Email: </p>
            <p>{userData.email}</p>
            <p>Role: </p> <p>{userData.role}</p>
            <p>Subscription : </p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>
          <div className=" flex items-center justify-between gap-2">
            <Link
              to="/changepassword"
              className="w-1/2 text-center bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer "
            >
              <button>Change Password</button>
            </Link>
            <Link
              to="/user/editprofile"
              className="w-1/2 text-center bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer "
            >
              <button>Edit Profile</button>
            </Link>
          </div>
          {userData?.subscription?.status === "active" && (
            <button className=" w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer ">
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default User;
