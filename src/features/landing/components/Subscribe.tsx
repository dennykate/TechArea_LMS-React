import React from "react";
// import { FaCaretRight } from "react-icons/fa";

import CircleDots from "../../../assets/circle-dots.svg";

const Subscribe = () => {
  return (
    <div className="w-full sm:py-28 py-20 bg-[#33415C] text-center relative">
      <h1
        className="md:text-[50px] sm:text-[40px] xs:text-[30px] text-[25px] font-bold text-white 
  font-poppins "
      >
        Subscribe Newsletter
      </h1>
      <p className="text-white text-base">
        Enter your email address to register to our newsletter delivered on a
        regular basis!
      </p>

      <div className="max-w-[500px] sm:h-[48px] h-[38px] rounded-full sm:mx-auto mx-2 bg-white my-10 flex pl-6">
        <input
          type="text"
          className="w-8/12 h-full bg-white border-none outline-none"
          placeholder="Enter Email"
        />
        <button
          type="button"
          className="w-4/12 translate-x-1 h-full rounded-full bg-[#235c51] flex justify-center items-center
          sm:text-lg text-sm text-white font-medium hover:bg-[#FF564F] transition-all duration-200 ease-in-out"
        >
          Subscribe
        </button>
      </div>

      <img
        src={CircleDots}
        alt="circle-dots"
        className="absolute bottom-0 -left-10 w-32"
      />
    </div>
  );
};

export default Subscribe;
