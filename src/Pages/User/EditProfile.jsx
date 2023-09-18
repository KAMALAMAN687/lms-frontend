import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    updatedname: "",
    avatar: undefined,
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!data.updatedname || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.updatedname.length < 5) {
      toast.error("Updated name has less than 5 character");
      return;
    }
    const formData = new FormData();
    formData.append("updatedname", data.updatedname);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile(formData));
    await dispatch(getUserData());
    navigate("/user/profile");
  }
  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className=" text-center text-2xl font-semibold ">Edit Profile</h1>
          <label className=" cursor-pointer " htmlFor="image_uploads">
            {data.previewImage ? (
              <img
                className=" w-28 h-28 rounded-full m-auto"
                src={data.previewImage}
              />
            ) : (
              <BsPersonCircle className=" w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            className=" hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg , .png ,.svg ,.jpeg"
          />
          <div className=" flex flex-col gap-3  ">
            <label htmlFor="updatedname" className=" text-lg font-semibold ">
              Updated UserName
            </label>
            <input
              required
              type="text"
              name="updatedname"
              id="updatedname"
              placeholder="Enter your Updated UserName"
              className=" bg-transparent px-2 py-1 border"
              value={data.updatedname}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className=" w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer"
          >
            Update Profile
          </button>
          <Link to="/user/profile">
            <p className=" flex items-center justify-center gap-2 link w-full text-accent cursor-pointer">
              <AiOutlineArrowLeft /> Go Back To Profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
