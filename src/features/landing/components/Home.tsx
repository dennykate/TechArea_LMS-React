import { useState } from "react";

import { HiOutlineXCircle } from "react-icons/hi";

import Kids from "../../../assets/kids.svg";
import Cross from "../../../assets/cross.svg";
import Triangle from "../../../assets/double-triangle.svg";

import Header from "./Header";
import { navbarData } from "../data";

const Home = () => {
  const [showNavItems, setShowNavItems] = useState(false);

  return (
    <>
      <Header setShowNavItems={setShowNavItems} />
      <div className="w-full min-h-screen relative">
        <div id="home" className="w-full sm:py-20 py-8 relative bg-white z-10 ">
          <div className="flex justify-between items-center lg:flex-row flex-col-reverse">
            <div
              className="lg:w-1/2 sm:w-[575px] w-full mx-auto lg:ml-10 lg:mt-0 mt-0 
          sm:pl-8"
            >
              <div
                className="font-semibold lg:text-7xl xs:text-5xl text-3xl text-gray-800 tracking-wide
             sm:text-left text-center"
              >
                Better future <br />
                for your kids
              </div>

              <p
                className="mt-3 text-black/50 sm:text-base xs:text-sm text-xs sm:leading-8 leading-4 
              sm:text-left text-center font-medium w-[90%]"
              >
                We just don't give our students only lecture but real life
                experiment, workshops and filed experience
              </p>

              <div className="sm:mt-18 mt-8 flex sm:justify-start justify-center sm:gap-10 gap-5 flex-wrap">
                <button
                  className="sm:w-[160px] sm:h-[47px] w-[120px] h-[35px]
                flex justify-center items-center border-[1px] 
              rounded-md cursor-pointer group border-primary relative"
                >
                  <p className="text-primary group-hover:text-white z-10 font-medium sm:text-base xs:text-sm text-xs">
                    Apply Now
                  </p>

                  <div
                    className="w-0 h-full absolute top-0 left-0 right-0
                group-hover:w-full transition-all duration-200 ease-in bg-primary-500 "
                  ></div>
                </button>

                <div
                  className="sm:w-[160px] sm:h-[47px] w-[120px] h-[35px] 
                flex justify-center items-center border-[1px] border-gray-500
              rounded-md cursor-pointer group hover:border-primary-500 relative"
                >
                  <button className="text-gray-500 group-hover:text-white z-10 font-medium sm:text-base xs:text-sm text-xs">
                    Learn More
                  </button>

                  <div
                    className="w-0 h-full absolute top-0 left-0 right-0
                group-hover:w-full transition-all duration-200 ease-in bg-primary-500 "
                  ></div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full lg:p-0 p-10 ">
              <img src={Kids} alt="kids" className="w-full h-[450px] z-20" />
            </div>
          </div>

          <img src={Cross} alt="cross" className="absolute -left-2 top-1/3" />
          <img
            src={Triangle}
            alt="triangle"
            className="absolute left-1/2 top-1/2 -z-10"
          />
        </div>

        <div
          className={`w-full h-screen bg-white z-[100] fixed top-0 left-0 right-0 bottom-0 
      ${
        showNavItems
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      } transition-all duration-500 ease-in-out`}
        >
          <button
            className="absolute top-10 right-10"
            onClick={() => setShowNavItems(false)}
          >
            <HiOutlineXCircle size={60} className="text-primary-500" />
          </button>

          <ul className=" list-none m-10 flex flex-col sm:gap-8 gap-4">
            {navbarData.map((data, index) => (
              <li
                key={index}
                className="font-bold text-black sm:text-2xl text-lg "
              >
                <a href={`/#${data.toLowerCase()}`}>{data}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
