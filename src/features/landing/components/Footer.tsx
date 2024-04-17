import React from "react";
import { FaPhone, FaHome, FaHourglass } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { footerInfoData, galleryData } from "../data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full pt-14 px-5 bg-gray-800">
      <div
        className="lg:w-full mx-auto grid lg:grid-cols-3 grid-cols-1 lg:gap-3 pb-16 
      border-b-2 border-[#FFAB4A] md:gap-20 gap-8"
      >
        <div className="">
          <p className="sm:text-2xl text-xl font-semibold text-white sm:mb-6 mb-4">
            Contact Us
          </p>
          <div className="flex flex-col gap-2">
            <a href="tel:" className="flex gap-3 items-center">
              <FaPhone className="text-white lg:text-base text-sm" />
              <p className=" text-white sm:text-base text-xs">
                Phone: +959 964 470 356
              </p>
            </a>
            <a
              href="mailto:dennykate22@gmail.com"
              className="flex gap-3 items-center"
            >
              <MdEmail className="text-white lg:text-base text-sm" />
              <p className=" text-white sm:text-base text-xs">
                Mail: dennykate22@gmail.com
              </p>
            </a>
            <div className="flex gap-3 items-center">
              <FaHome className="text-white lg:text-base text-sm" />
              <p className=" text-white sm:text-base text-xs">
                Address: 3366 Jefferson Street, NEW HAMPTON, IA
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <FaHourglass className="text-white lg:text-base text-sm" />
              <p className=" text-white sm:text-base text-xs">
                Working day: 9am - 5pm EST, Monday - Friday
              </p>
            </div>
          </div>
        </div>

        <div className="lg:pl-3">
          <p className="sm:text-2xl text-xl font-semibold text-white sm:mb-6 mb-4">
            Information
          </p>
          <div className="grid grid-cols-2 ">
            <div className="flex flex-col gap-3">
              {footerInfoData.slice(0, 4).map((item, i) => (
                <Link
                  to={"/#" + item.toLowerCase()}
                  key={i}
                  className=" text-white sm:text-base text-xs capitalize"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {footerInfoData.slice(4, 7).map((item, i) => (
                <Link
                  to={"/#" + item.toLowerCase()}
                  key={i}
                  className=" text-white sm:text-base text-xs capitalize"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="">
          <p className="sm:text-2xl text-xl font-semibold text-white sm:mb-6 mb-4">
            Our Gallery
          </p>

          <div className="grid grid-cols-4 gap-3">
            {galleryData.map((data, index) => (
              <div
                key={index}
                className=" border-2 border-white rounded-md p-0
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

      <div
        className="py-5 text-center text-white font-light font-poppins xs:text-sm 
      text-xs flex justify-between items-center"
      >
        <p>Tech Area LMS</p>
        <p>©2024 All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
