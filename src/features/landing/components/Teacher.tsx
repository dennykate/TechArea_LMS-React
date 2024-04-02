/* eslint-disable no-irregular-whitespace */
// import { FaCaretRight } from "react-icons/fa";

import { paragraph, subTitle, teacherData, title } from "../data";
import TeacherCard from "./TeacherCard";

const Teacher = () => {
  return (
    <div id="teachers" className="w-full py-28">
      <div className="w-2/3 mx-auto text-center">
        <h6 className={subTitle}>Together We Can Create</h6>
        <h1 className={title}>Who Stand By Your Kids Always</h1>
        <p className={paragraph}>
          While the unit economics were a driving factor, the company says its
          acquisition of lidar company Blackmore and the integration of that
          tech in its self-driving stack has made the shift to trucks possible.
          Aurora has said its FirstLight.
        </p>
      </div>
      <div className="my-14 grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-10 sm:px-5 px-1">
        {teacherData.map((data, index) => (
          <TeacherCard key={index} data={data} />
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

export default Teacher;
