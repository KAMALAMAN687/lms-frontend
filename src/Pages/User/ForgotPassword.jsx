import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

function ForgotPassword() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    email: "",
  });
  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email) {
      toast.error("Enter your Email first");
      return;
    }
    try {
      const response = axiosInstance.post("/user/forgotpassword", userInput);
      toast.promise(response, {
        loading: "Verification in Progress ....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to Sent the Email",
      });
      const Emailresponse = (await response).data;
      console.log(Emailresponse);
      if (Emailresponse?.success) {
        setUserInput({
          email: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Forgot Password</h1>
          <p className=" text-center text-accent">
            Enter Your Email Registered with Us and we will send you link to
            reset your password{" "}
          </p>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Enter your Registered Email
            </label>
            <input
              className=" bg-transparent px-2 py-1 border"
              type="email"
              id="email"
              required
              name="email"
              placeholder="Enter Your Registered Email"
              onChange={handleUserInput}
              value={userInput.email}
            />
          </div>

          <button
            className="w-full mt-3 bg-yellow-600 hover:bg-yellow-500  transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer "
            type="submit"
          >
            Submit
          </button>

          <Link to="/login">
            <p className=" flex items-center justify-center gap-2 link w-full text-accent cursor-pointer">
              <AiOutlineArrowLeft /> Go Back To Login
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ForgotPassword;
