/* eslint-disable no-unused-vars */
import React from "react";
import { FaPlay } from "react-icons/fa";

import LectureStudent from "../../../assets/lecture-student.jpg";
import School from "../../../assets/school.png";
import Student from "../../../assets/student.png";
import Book from "../../../assets/book.png";

const Marketing = () => {
  return (
    <div className="w-full sm:mt-0 mt-16 flex  lg:flex-row flex-col">
      <div className="lg:w-1/2 w-full lg:h-auto h-[400px]  relative ">
        <img
          src={LectureStudent}
          alt="lecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute w-full h-full flex justify-center items-center top-0 right-0 left-0 bottom-0">
          <div
            className="w-16 h-16 rounded-full flex justify-center items-center bg-white
          hover:bg-[#FF564F] hover:text-white text-[##33415C] cursor-pointer transition-all duration-200 ease-in-out"
          >
            <FaPlay size={22} />
          </div>
        </div>
      </div>

      <div className="lg:w-[51%] w-full  bg-[#235C51] sm:py-16 xs:py-10 py-5 sm:px-10 xs:px-3 px-2">
        <h6 className="font-poppins font-bold xs:text-xl text-lg text-white">
          Why Hesitate To Register?
        </h6>
        <h1 className="font-poppins font-bold xs:text-5xl text-4xl my-5 text-white">
          We Are The Best Choice For Your Child
        </h1>
        <h6 className="text-white text-base ">
          As a word from our heart, we love to dedicate for Kids the valuable
          things in Life. A great education is a must for a solid developments
          in both soul and mind for kids. We go with kids to play, learn, and
          grow better.
        </h6>
        <div className="w-full mt-8 flex flex-col sm:gap-8 gap-5">
          <div className="flex xs:gap-5 gap-2 items-center">
            <div className="rounded-[100%] bg-white xs:p-6 p-3">
              <img src={School} alt="school" className="sm:w-8 w-12" />
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-medium text-white xs:text-xl text-base">
                Well Trained Professionals
              </h6>
              <h6 className="text-white xs:text-base text-sm">
                Enabling humanoid robot movement with imitation learning and
                mimicking of animal behaviors
              </h6>
            </div>
          </div>

          <div className="flex xs:gap-5 gap-2 items-center">
            <div className="rounded-[100%] bg-white xs:p-6 p-3">
              <img src={Student} alt="school" className="sm:w-8 w-12" />
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-medium text-white xs:text-xl text-base">
                International Lesson Patterns
              </h6>
              <h6 className="text-white xs:text-base text-sm">
                Summer of the SPAC, Adam Neumann returns and the Nissan Ariya
                debuts
              </h6>
            </div>
          </div>

          <div className="flex xs:gap-5 gap-2 items-center">
            <div className="rounded-[100%] bg-white xs:p-6 p-3">
              <img src={Book} alt="school" className="sm:w-8 w-12" />
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-medium text-white xs:text-xl text-base">
                Awesome Infra-Structure
              </h6>
              <h6 className="text-white xs:text-base text-sm">
                Ready, set, network! CrunchMatch is now open for Early Stage
                2020
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
