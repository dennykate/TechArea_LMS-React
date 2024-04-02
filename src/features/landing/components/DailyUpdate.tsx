/* eslint-disable no-irregular-whitespace */
import React from "react";
// import { FaCaretRight } from "react-icons/fa";
import { dailyUpdateData, subTitle, title } from "../data";
import { FaCaretRight } from "react-icons/fa6";

const DailyUpdate = () => {
  return (
    <div className="w-full py-24">
      <div className="w-2/3 mx-auto text-center">
        <h6 className={subTitle}>Together We Can Create</h6>
        <h1 className={title}>Accouncements Updated Daily</h1>
      </div>

      <div className="my-10 w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 sm:px-10 px-2 mx-auto">
        {dailyUpdateData.map((data, index) => (
          <div
            key={index}
            className="sm:h-[450px] min-h-[480px] lg:shadow-sm shadow-2xl hover:-translate-y-3 hover:shadow-2xl
        transition duration-200 ease-in-out relative group border border-black border-opacity-10"
          >
            <img
              src={data.thumbnail}
              alt="daily-update"
              className="w-full h-[240px] object-cover"
            />
            <div className="px-5 mt-5">
              <h1 className=" font-poppins font-bold text-xl">{data.title}</h1>
              <p className=" font-sans text-base mt-2">{data.paragraph}</p>
              <p className="font-poppins text-sm mt-7 text-primary-500">
                Created At - Dec 17, 2020
              </p>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 w-full h-[3px] bg-[#F4524C] lg:hidden block
          group-hover:block"
            ></div>
          </div>
        ))}
      </div>
      <div
        className="max-w-[320px] h-[50px] border-2 border-[#33415C] flex justify-center gap-3 
      items-center mx-auto mt-18 cursor-pointer group relative"
      >
        <h4
          className="font-poppins text-[#33415C] font-bold group-hover:text-white 
        transition-all duration-200 ease-in-out"
        >
          Discover More Accouncements
        </h4>
        <FaCaretRight
          size={18}
          className="text-[#33415C] group-hover:text-white transition-all duration-200 ease-in-out"
        />

        <div
          className="w-0 h-0 group-hover:w-full group-hover:h-full bg-[#33415C] absolute top-0 left-0 right-0 
        bottom-0 -z-10 transition-all duration-200 ease-in-out origin-center"
        ></div>
      </div>
    </div>
  );
};

export default DailyUpdate;
