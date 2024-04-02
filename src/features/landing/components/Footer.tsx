import React from "react";
import { FaPhone, FaHome, FaHourglass } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { galleryData } from "../data";

const Footer = () => {
  return (
    <div className="w-full pt-24 px-5 bg-black">
      <div
        className="lg:w-full md:w-2/3 mx-auto grid lg:grid-cols-3 grid-cols-1 lg:gap-3 pb-16 
      border-b-2 border-[#FFAB4A] md:gap-20 gap-8"
      >
        <div className="">
          <h1 className="sm:text-3xl text-xl font-bold text-white sm:mb-8 mb-4">
            Contact Us
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <FaPhone className="text-white lg:text-lg text-sm" />
              <p className=" text-white sm:text-lg text-xs">
                Phone: +1 516 231 1313
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <MdEmail className="text-white lg:text-lg text-sm" />
              <p className=" text-white sm:text-lg text-xs">
                Mail: 0devdesign.studio@gmail.com
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <FaHome className="text-white lg:text-lg text-sm" />
              <p className=" text-white sm:text-lg text-xs">
                Address: 3366 Jefferson Street, NEW HAMPTON, IA
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <FaHourglass className="text-white lg:text-lg text-sm" />
              <p className=" text-white sm:text-lg text-xs">
                Working day: 9am - 5pm EST, Monday - Friday
              </p>
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="sm:text-3xl text-xl font-bold text-white sm:mb-8 mb-4">
            Information
          </h1>
          <div className="grid grid-cols-2 ">
            <div className="flex flex-col gap-3">
              <a href="" className=" text-white sm:text-lg text-xs">
                - Home
              </a>
              <a href="" className=" text-white sm:text-lg text-xs">
                - About Us
              </a>

              <a href="" className=" text-white sm:text-lg text-xs">
                - Contact Us
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="" className=" text-white sm:text-lg text-xs">
                - Teachers
              </a>
              <a href="" className=" text-white sm:text-lg text-xs">
                - Events
              </a>
              <a href="" className=" text-white sm:text-lg text-xs">
                - Classes
              </a>
              <a href="" className=" text-white sm:text-lg text-xs">
                - Location
              </a>
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="sm:text-3xl text-xl font-bold text-white sm:mb-8 mb-4">
            Our Gallery
          </h1>

          <div className="grid grid-cols-4 gap-3">
            {galleryData.map((data, index) => (
              <div
                key={index}
                className=" border-2 border-white rounded-md cursor-pointer p-0
            overflow-hidden"
              >
                <img
                  src={data}
                  alt="gallery"
                  className="w-[110%] h-[110%] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8 text-center text-white font-thin font-poppins md:text-base xs:text-sm text-xs">
        ©2020 Dev - Kindergarten is Product Created by Devdesign.studio
      </div>
    </div>
  );
};

export default Footer;
