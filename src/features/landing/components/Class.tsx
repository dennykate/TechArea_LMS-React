import { FaCaretRight } from "react-icons/fa";

import ClassCard from "./ClassCard";
import { classData, paragraph, subTitle, title } from "../data";

const Class = () => {
  return (
    <div id="classes" className="w-full sm:py-20  py-5">
      <div className="md:w-2/3 w-11/12 mx-auto text-center py-5 flex justify-center items-center flex-col">
        <h6 className={subTitle}>Education For Everyone</h6>
        <h3 className={title}>Learn About Our Work Culture At Devschool</h3>
        <p className={paragraph}>
          As a word from our heart, we love to dedicate for Kids the valuable
          things in Life. A great education is a must for a solid developments
          in both soul and mind for kids. We go with kids to play, learn, and
          grow better.
        </p>
      </div>

      <div className="mt-10 grid lg:grid-cols-3 grid-cols-1 gap-10 sm:px-10 px-2">
        {classData.map((data, index) => (
          <ClassCard data={data} key={index} />
        ))}
      </div>

      <div
        className="max-w-[280px] h-[50px] border-2 border-[#33415C] flex justify-center gap-3 
      items-center mx-auto mt-24 cursor-pointer group relative"
      >
        <h4
          className="font-poppins text-[#33415C] font-bold group-hover:text-white 
        transition-all duration-200 ease-in-out"
        >
          Discover More Projects
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

export default Class;
