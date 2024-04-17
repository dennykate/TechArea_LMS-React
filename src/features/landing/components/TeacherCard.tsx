import React from "react";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaLinkedin,
// } from "react-icons/fa";

interface PropsType {
  data: {
    profile: string;
    name: string;
    role: string;
  };
}

const TeacherCard: React.FC<PropsType> = ({ data }) => {
  return (
    <div className="h-[300px] group relative overflow-hidden rounded-md ">
      <img
        src={data.profile}
        alt="teacher"
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-in-out"
      />

      <div
        className="absolute bottom-[30px] group-hover:bottom-[50px] transition-all duration-300 ease-in-out
         left-0 right-0 w-full z-10 flex
       justify-center"
      >
        <div
          className="w-2/3  h-[80px] 
            flex justify-center items-center flex-col bg-white  rounded-lg group 
            transition-all duration-200 ease-in-out "
        >
          <h1 className="font-poppins font-bold text-gray-800 sm:text-lg text-base sm:translate-y-0 ">
            {data.name}
          </h1>
          <h6 className=" font-poppins sm:text-base text-sm sm:translate-y-0 ">
            {data.role}
          </h6>
          {/* <div
            className="sm:hidden flex translate-y-5 group-hover:flex group-hover:translate-y-0 gap-3 sm:mt-2 -mt-3
              transition-all duration-200 ease-in-out"
          >
            <a
              href="https://www.facebook.com"
              className="cursor-pointer text-primary-500 hover:text-[#000]"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://www.twitter.com"
              className="cursor-pointer text-primary-500 hover:text-[#000]"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="https://www.instagram.com"
              className="cursor-pointer text-primary-500 hover:text-[#000]"
            >
              <FaInstagram size={14} />
            </a>
            <a
              href="https://www.linkdin.com"
              className="cursor-pointer text-primary-500 hover:text-[#000]"
            >
              <FaLinkedin size={14} />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
