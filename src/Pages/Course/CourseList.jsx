import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import CoursCard from "../../Components/CoursCard";

function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 flex-col gap-10 text-white">
        <h1 className=" text-center text-3xl font-semibold mb-5">
          Explore the Courses made by
          <span className="font-bold text-yellow-500"> Industry Experts</span>
        </h1>
        <div className="mb-10 flex flex-wrap gap-14">
          {courseData?.map((element) => {
            return <CoursCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseList;
