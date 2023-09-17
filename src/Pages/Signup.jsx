import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Await, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
import { isEmail, isValidPassword } from "../Helpers/RegexMatcher";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  }

  function getImage(event) {
    event.preventDefault();
    //getting the image
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({ ...signupData, avatar: uploadedImage });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword ||
      !signupData.username ||
      !signupData.avatar
    ) {
      toast.error("Please Fill all the details");
      return;
    }

    //checking name field length
    if (signupData.username.length < 5) {
      toast.error("Name should be aleast of 5 characters");
      return;
    }

    //checking email validation
    if (!isEmail(signupData.email)) {
      toast.error("Invalid Email Id");
      return;
    }

    //checking password validation
    if (!isValidPassword(signupData.password)) {
      toast.error(
        "Password Should be 6-16 character long with atleast a number and special character"
      );
      return;
    }
    if (signupData.password != signupData.confirmPassword) {
      toast.error("Password and Confirm Password are not Same");
      return;
    }
    const formData = new FormData();
    formData.append("username", signupData.username);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);
    formData.append("confirmPassword", signupData.confirmPassword);

    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) navigate("/");

    setSignupData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    });

    setPreviewImage("");
  }

  //  dispatch create acoount action

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

          <label htmlFor="image_uploads" className=" cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>

          <input
            type="file"
            className="hidden "
            id="image_uploads"
            accept=".jpg,.jpeg,.png,.svg"
            name="image_uploads"
            onChange={getImage}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              className=" bg-transparent px-2 py-1 border"
              type="text"
              id="username"
              required
              name="username"
              placeholder="Enter Your Username"
              onChange={handleUserInput}
              value={signupData.username}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              className=" bg-transparent px-2 py-1 border"
              type="email"
              id="email"
              required
              name="email"
              placeholder="Enter Your Email"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              className=" bg-transparent px-2 py-1 border"
              type="password"
              id="password"
              required
              name="password"
              placeholder="Enter Your Password"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="font-semibold">
              Confirm Password
            </label>
            <input
              className=" bg-transparent px-2 py-1 border"
              type="password"
              id="confirmPassword"
              required
              name="confirmPassword"
              placeholder="Enter Your Confirm Password"
              onChange={handleUserInput}
              value={signupData.confirmPassword}
            />
          </div>

          <button
            className="w-full mt-3 bg-yellow-600 hover:bg-yellow-500  transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer "
            type="submit"
          >
            Create Account
          </button>

          <p className="text-center ">
            Already have an Account ? .
            <Link to="/login" className="link text-accent cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
