import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/CourseSlice";
import razorpaySliceReducer from "./Slices/RazorpaySlice";
import LectureSliceReducer from "./Slices/LectureSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: CourseSliceReducer,
    razorpay: razorpaySliceReducer,
    lecture: LectureSliceReducer,
  },
  devTools: true,
});

export default store;
