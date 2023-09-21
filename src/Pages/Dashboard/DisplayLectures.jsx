import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);
  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    await dispatch(
      deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
    console.log(state);
  }, []);

  return (
    <HomeLayout>
      <div className=" flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-5">
        <div className="text-center text-2xl  font-semibold text-yellow-500 underline">
          Course Name : {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className=" flex flex-row justify-center gap-10 w-full">
            {/* Left section for playing videos and displaying course details to admin */}

            <div className=" space-y-5  w-[48rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                className=" object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              ></video>
              <div className=" text-xl">
                <h1 className=" text-xl">
                  <span className=" text-yellow-500  ">Title : </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className=" text-yellow-500 line-clamp-4 ">
                    Description :{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>
            {/* right section for displaying list of lectures */}

            <ul className=" w-[38rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li
                key={lectures.id}
                className="font-semibold text-xl text-yellow-500 flex items-center justify-between"
              >
                <p>Lectures List</p>
                {role === "ADMIN" && (
                  <button
                    onClick={() => {
                      navigate("/course/addlecture", { state: { ...state } });
                    }}
                    className=" btn-primary m-2 px-2 py-1 rounded-md font-semibold text-sm"
                  >
                    Add New Lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li
                      className=" space-y-2 p-5 bg-black rounded-md hover:bg-slate-300 transition-all ease-in-out duration-300 hover:text-black "
                      key={lecture.id}
                    >
                      <p
                        className=" cursor-pointer font-semibold "
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span> Lecture {idx + 1} : </span>
                        {lecture.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?._id, lecture?._id)
                          }
                          className=" btn-accent 
                         px-2 py-1 rounded-md font-semibold text-sm"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() => {
                navigate("/course/addlecture", { state: { ...state } });
              }}
              className=" btn-primary m-2 px-2 py-1 rounded-md font-semibold text-sm"
            >
              Add New Lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
