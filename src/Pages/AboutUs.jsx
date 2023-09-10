import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../Assets/Images/aboutMainImage.png";
import { celebrities } from "../Constants/CelebrityData";
import CarouselSlide from "../Components/CarouselSlide";
function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and quality Education
            </h1>
            <p className="text-xl text-gray-200">
              Our Goal is to provide the Affordable and quality Education to the
              World. We are providing the platform for the aspiringteachers and
              students to share their skills, creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind
            </p>
          </section>
          <div className="w-1/2">
            <img
              id="test1"
              className=" drop-shadow-2xl"
              style={{ filter: "drop-shadow(0px 10px 10px rgb(0,0,0)" }}
              src={aboutMainImage}
              alt="About main image"
            />
          </div>
        </div>
        <div className="carousel w-1/2 my-16 m-auto">
          {celebrities &&
            celebrities.map((celebrity) => (
              <CarouselSlide
                {...celebrity}
                key={celebrity.SlideNumber}
                totalSlides={celebrities.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
