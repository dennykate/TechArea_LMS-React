import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

import { MdOutlineClass } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
// import { MdLocationOn } from "react-icons/md";

interface PropsType {
  data: {
    name: string;
    subject: string;
    description: string;
    grade: string;
    section: string;
    thumbnail: string;
  };
}
const ClassCard = ({ data }: PropsType) => {
  const [showDoubleCard, setShowDoubleCard] = useState(false);
  console.log(data);
  return (
    <div
      className={`bg-white flex flex-col rounded-md relative lg:w-full sm:w-2/3 w-full mx-auto 
      ${showDoubleCard ? "shadow-xl" : "shadow-md"}`}
      onMouseEnter={() => {
        setShowDoubleCard(true);
      }}
      onMouseLeave={() => {
        setShowDoubleCard(false);
      }}
    >
      <div className="w-full h-[250px] relative">
        <img
          src={data.thumbnail}
          alt="class-image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="sm:px-6 px-3 sm:py-6 py-3">
        <h3 className="font-poppins font-bold text-gray-800 text-2xl">
          {data?.name}
        </h3>
        <div
          dangerouslySetInnerHTML={{ __html: data?.description }}
          className="sm:text-base text-sm mt-2"
        />
        <div className="w-full mt-2 grid grid-cols-3">
          <div className=" flex items-center gap-1">
            <RiGraduationCapFill size={20} className="text-gray-800" />
            <p className="sm:text-base text-sm">{data?.subject}</p>
          </div>
          <div className="flex gap-1 items-center">
            <MdOutlineClass size={20} className="text-gray-800" />
            <p className="sm:text-base text-sm">{data?.grade}</p>
          </div>
          <div className="flex gap-1 items-center">
            <MdOutlineClass size={20} className="text-gray-800" />
            <p className="sm:text-base text-sm">{data?.section}</p>
          </div>
        </div>

        <div className="sm:my-3 my-2 sm:pb-3 pb-0 cursor-pointer group relative">
          <a href="" className="font-bold text-[#FF564F] pb-2 relative">
            Enroll Now{" "}
            <FaChevronRight
              size={12}
              color="#FF564F"
              className="-translate-y-[1.5px] font-bold inline ml-7 group-hover:ml-0  transition-all duration-200 ease-in-out"
            />
            <div
              className="w-0 group-hover:w-full h-[3px] bg-[#FF564F] absolute bottom-0
              transition-all duration-200 ease-in-out"
            ></div>
          </a>
        </div>
      </div>

      <div
        className={` border-4 border-primary-500 -z-10 absolute top-0 right-0 left-0 transition-all
            ${
              showDoubleCard ? "w-full h-full -translate-x-2 translate-y-2" : ""
            }
          duration-100 ease-in-out `}
      ></div>
    </div>
  );
};

export default ClassCard;