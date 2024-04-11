import { useState } from "react";
import { FaBook, FaChevronRight } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
// import { MdLocationOn } from "react-icons/md";

interface PropsType {
  data: {
    title: string;
    price: string;
    lessons: string;
    students: string;
    thumbnail: string;
  };
}
const ClassCard = ({ data }: PropsType) => {
  const [showDoubleCard, setShowDoubleCard] = useState(false);
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
        {/* <div
          className="w-14 h-14 absolute right-10 -bottom-7 bg-primary-500 rounded-full
          flex justify-center items-center font-bold text-white"
        >
          {data.price}
        </div> */}
      </div>
      <div className="sm:px-6 px-3 sm:py-6 py-3">
        <h3 className="font-poppins font-bold text-gray-800 text-2xl">{data.title}</h3>
        <div className="sm:mt-6 mt-4 flex gap-3">
          <div className="flex gap-2 items-center">
            <FaBook size={20} className="text-gray-800" />
            <p className="sm:text-base text-sm">{data.lessons}</p>
          </div>
          <div className="flex gap-2 items-center">
            <BsFillPersonFill size={20} className="text-gray-800" />
            <p className="sm:text-base text-sm">{data.students}</p>
          </div>
        </div>
        {/* <div className="flex gap-2 items-center mt-3">
          <MdLocationOn size={20} color="black" />
          <p className="sm:text-base text-sm">Alice Bohm , Linda Glendell</p>
        </div> */}
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
