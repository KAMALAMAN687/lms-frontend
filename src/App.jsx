import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import CourseList from "./Pages/Course/CourseList";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import CourseDescription from "./Pages/Course/CourseDescription";
import CreateCourse from "./Pages/Course/CreateCourse";
import RequireAuth from "./Components/Auth/RequireAuth";
import User from "./Pages/User/User";
import EditProfile from "./Pages/User/EditProfile";
import Checkout from "./Pages/Payment/Checkout";
import CheckOutSuccess from "./Pages/Payment/CheckOutSuccess";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
import AddLecture from "./Pages/Dashboard/AddLecture";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/denied" element={<Denied />}></Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route
            path="/course/description"
            element={<CourseDescription />}
          ></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />}></Route>
          <Route path="/course/addlecture" element={<AddLecture />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<User />}></Route>
          <Route path="/user/editprofile" element={<EditProfile />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/checkout/success" element={<CheckOutSuccess />}></Route>
          <Route path="/checkout/fail" element={<CheckoutFailure />}></Route>
          <Route
            path="/course/displaylectures"
            element={<DisplayLectures />}
          ></Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
