import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { BiRupee } from "react-icons/bi";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);

  const order_id = useSelector((state) => state?.razorpay?.order_id);
  const userdata = useSelector((state) => state?.auth?.data);
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_signature: "",
  };

  async function load() {
    await dispatch(getRazorpayId());
    await dispatch(purchaseCourseBundle());
  }

  async function handleSubscription(e) {
    e.preventDefault();
    if (!razorpayKey || !order_id) {
      toast.error("Something Went Wrong");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: "5000",
      currency: "INR",
      order_id: order_id,
      name: "Coursify Pvt. Ltd",
      description: "Subscription",
      theme: {
        color: "#F37254",
      },
      prefill: {
        email: userdata.email,
        name: userdata.username,
      },
      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        toast.success("Payment SuccessFull");
        const res = await dispatch(verifyUserPayment(paymentDetails));
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("checkout/fail");
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white "
      >
        <div className=" w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative ">
          <h1 className=" bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg ">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center ">
            <p className=" text-[17px]">
              This Purchase will Allow you to Access All Available Courses of
              our Platform for{" "}
              <span>
                <br />1 Year Duration
              </span>
              All the Existing and new Launched Courses will be also available
            </p>
            <p className=" flex items-center  justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> <span>499</span> only
            </p>
            <div className=" text-gray-200">
              <p>100% refund on cancellation.</p>
              <p> * Terms and Conditions Applied</p>
            </div>
            <button
              type="submit "
              className=" bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute w-full bottom-0 left-0 text-xl font-bold rounded-bl-lg py-2 rounded-br-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
