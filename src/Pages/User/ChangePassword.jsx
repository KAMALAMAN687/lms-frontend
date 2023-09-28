import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changepassword, getUserData } from "../../Redux/Slices/AuthSlice";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.oldPassword || !userInput.newPassword) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(changepassword(userInput));
    await dispatch(getUserData());
    console.log(response);
    if (response?.payload?.success) navigate("/user/profile");
    setUserInput({
      oldPassword: "",
      newPassword: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold mb-10">Reset Password</h1>
          <div className="flex flex-col w-full gap-1 mb-5 ">
            <label htmlFor="oldPassword" className="text-xl font-semibold">
              Old Password
            </label>
            <input
              type="text"
              name="oldPassword"
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="oldPassword"
              placeholder="Enter Your Old Password"
              onChange={handleInputChange}
              value={userInput.oldPassword}
            />
          </div>

          <div className="flex flex-col w-full mb-5 gap-1 ">
            <label htmlFor="newpassword" className="text-xl font-semibold">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="newpassword"
              placeholder="Enter Your New Password"
              onChange={handleInputChange}
              value={userInput.newPassword}
            />
          </div>
          <button
            type="submit "
            className=" w-full bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Change Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
