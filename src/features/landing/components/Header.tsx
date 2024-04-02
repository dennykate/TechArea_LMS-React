import { BiMenuAltRight } from "react-icons/bi";
import { GiRotaryPhone } from "react-icons/gi";
import { navbarData } from "../data";
import { FaFacebookF, FaHome, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";
import Logo from "../../../assets/logo.png";
import { useEffect, useState } from "react";

interface PropsType {
  setShowNavItems: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ setShowNavItems }: PropsType) => {
  const [scrollY, setScrollY] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    });
  }, [scrollY]);

  return (
    <>
      {/* small header */}
      <div
        className="w-full min-h-[50px] bg-white flex justify-between items-center px-5 border-b
  md:flex-row flex-col"
      >
        <div className="flex md:gap-5 gap-2 md:my-0 my-2 md:flex-row flex-col justify-center items-center">
          <div className="flex gap-1">
            <HiEnvelope size={19} color="#564FFF" />
            <a
              href="mailto:dennykate22@gmail.com"
              className=" text-black font-bold sm:text-xs text-[11px]"
            >
              dennykate22@gmail
            </a>
          </div>
          <div className="flex gap-1">
            <FaHome size={19} color="#564FFF" />
            <a
              href=""
              className=" text-black font-bold text-xs sm:text-xs text-[11px]"
            >
              4297 Libby Street, Beverly Hills, California
            </a>
          </div>
        </div>

        <div className="flex gap-7 mr-3 md:mb-0 mb-2">
          <a href="https://www.facebook.com">
            <FaFacebookF size={19} color="#564FFF" />
          </a>
          <a href="https://www.instagram.com">
            <FaInstagram size={19} color="#564FFF" />
          </a>
          <a href="https://www.twitter.com">
            <FaTwitter size={19} color="#564FFF" />
          </a>
        </div>
      </div>
      {/* navbar */}
      <div
        className={`w-full h-[100px] bg-white flex justify-between items-center lg:px-5 sm:px-20  px-5
  ${scrollY ? "fixed" : "sticky"} top-0 left-0 right-0 z-50 shadow-xl `}
      >
        <img src={Logo} alt="logo" className="w-[100px] h-[40px]" />

        <ul className=" list-none hidden gap-4 lg:flex ">
          {navbarData.map((data, index) => (
            <li
              key={index}
              className="font-bold cursor-pointer group px-2 relative h-[60px] 
        flex justify-center items-center"
            >
              <a
                href={`#${data.toLowerCase()}`}
                className="group-hover:text-[#564FFF]"
              >
                {data}
              </a>
              <div
                className=" h-[3px] absolute bottom-0 left-0 bg-[#564FFF] rounded-md w-0 
          group-hover:w-full transition-all duration-200 ease-in"
              ></div>
            </li>
          ))}
        </ul>

        <a
          href="tel:09964470356"
          className="px-6 py-5 bg-[#564FFF] gap-3 items-center rounded-md cursor-pointer sm:flex
      hidden hover:-translate-y-1 transform transition-all duration-200 "
        >
          <GiRotaryPhone size={22} color="white" />
          <h6 className="text-white font-medium text-sm sm:text-lg font-poppins">
            +959 964470356
          </h6>
        </a>

        <button
          className="lg:hidden visible"
          onClick={() => setShowNavItems(true)}
        >
          <BiMenuAltRight size={50} color="#FFAB4A" />
        </button>
      </div>
    </>
  );
};

export default Header;
