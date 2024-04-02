/* eslint-disable no-irregular-whitespace */
import React from "react";
// import { FaCaretRight } from "react-icons/fa";
import { dailyUpdateData, subTitle, title } from "../data";


const DailyUpdate = () => {
  return (
    <div className="w-full py-24">
      <div className="w-2/3 mx-auto text-center">
        <h6 className={subTitle}>Together We Can Create</h6>
        <h1 className={title}>Interesting Articles Updated Daily</h1>
      </div>

      <div className="my-10 w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 sm:px-10 px-2 mx-auto">
        {dailyUpdateData.map((data, index) => (
          <div
            key={index}
            className="sm:h-[450px] min-h-[480px] lg:shadow-sm shadow-2xl hover:-translate-y-3 hover:shadow-2xl
        transition duration-200 ease-in-out relative group"
          >
            <img
              src={data.thumbnail}
              alt="daily-update"
              className="w-full h-[240px] object-cover"
            />
            <div className="px-5 mt-5">
              <h1 className=" font-poppins font-bold text-xl">{data.title}</h1>
              <p className=" font-sans text-base mt-2">{data.paragraph}</p>
              <p className="font-poppins text-sm mt-7 text-[#564FFF]">
                12 Comments | Dec 17, 2020
              </p>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 w-full h-[3px] bg-[#F4524C] lg:hidden block
          group-hover:block"
            ></div>
          </div>
        ))}
      </div>
      {/* <div className="w-full md:h-[60px] h-auto flex md:flex-row flex-col justify-center items-center gap-5">
        <h1 className=" font-sans font-bold sm:text-2xl text-lg text-[#383838]">
          With 20+ Qualified Teacher?​
        </h1>
        <div
          className="w-[230px] h-[60px] border-[2px] border-[#383838] flex justify-center items-center gap-2
        cursor-pointer relative p-0 group"
        >
          <h1
            className=" font-sans font-medium sm:text-xl text-base text-[#383838] group-hover:text-white
          transition-all duration-200 ease-in-out"
          >
            View All Here
          </h1>
          <FaCaretRight
            size={23}
            className="text-[#33415C] group-hover:text-white transition-all duration-200 ease-in-out"
          />

          <div
            className="w-0 h-0 group-hover:w-[101%] group-hover:h-[103%] -translate-y-[1px] -translate-x-[1px]
             bg-[#383838] -z-10  absolute top-0 left-0 right-0 bottom-0 transition-all duration-200 ease-in-out"
          ></div>
        </div>

        <div className="w-[85px]">
          <div className="relative group">
            <a
              href=""
              className="font-sans font-bold  text-[#FF564F] cursor-pointer group-hover:tracking-widest
              transition-all duration-500  ease-in-out text-2xl"
            >
              Carrers
            </a>

            <div
              className="sm:w-2/6 w-full group-hover:w-full absolute h-1 bg-[#FF564F] bottom-0 translate-y-1
              transition-all duration-500 ease-in-out"
            ></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DailyUpdate;
