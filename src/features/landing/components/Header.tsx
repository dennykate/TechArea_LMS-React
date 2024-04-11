import { BiMenuAltRight } from "react-icons/bi";
import { navbarData } from "../data";
import { FaFacebookF, FaHome, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";
import Logo from "../../../assets/logo.png";
import { useEffect, useMemo, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import { FaSchool } from "react-icons/fa6";

interface PropsType {
  setShowNavItems: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setShowNavItems }: PropsType) => {
  const { get } = useEncryptStorage();
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

  const token = useMemo(() => get("token"), []);

  return (
    <>
      {/* small header */}
      <div
        className="w-full min-h-[50px] bg-white flex justify-between items-center px-5 border-b
  md:flex-row flex-col"
      >
        <div className="flex md:gap-5 gap-2 md:my-0 my-2 md:flex-row flex-col justify-center items-center">
          <div className="flex gap-1">
            <HiEnvelope size={19} color="#1cd6ab" />
            <a
              href="mailto:dennykate22@gmail.com"
              className=" text-black font-bold sm:text-xs text-[11px]"
            >
              dennykate22@gmail
            </a>
          </div>
          <div className="flex gap-1">
            <FaHome size={19} color="#1cd6ab" />
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
            <FaFacebookF size={19} color="#1cd6ab" />
          </a>
          <a href="https://www.instagram.com">
            <FaInstagram size={19} color="#1cd6ab" />
          </a>
          <a href="https://www.twitter.com">
            <FaTwitter size={19} color="#1cd6ab" />
          </a>
        </div>
      </div>
      {/* navbar */}
      <div
        className={`w-full h-[100px] bg-white flex justify-between items-center lg:px-5 sm:px-20  px-5
  ${scrollY ? "fixed" : "sticky"} top-0 left-0 right-0 z-50 shadow-xl `}
      >
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="w-[100px] h-[40px]" />
        </Link>

        <ul className=" list-none hidden gap-4 lg:flex ">
          {navbarData.map((data, index) => (
            <li
              key={index}
              className="font-bold cursor-pointer group px-2 relative h-[60px] 
        flex justify-center items-center"
            >
              <a
                href={`/#${data.toLowerCase()}`}
                className="group-hover:text-primary-500"
              >
                {data}
              </a>
              <div
                className=" h-[3px] absolute bottom-0 left-0 bg-primary-500 rounded-md w-0 
          group-hover:w-full transition-all duration-200 ease-in"
              ></div>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {token ? (
            <Link
              to={"/dashboard"}
              className="sm:px-6 sm:py-3 px-4 py-2 bg-primary-500 gap-3 items-center rounded-md
             cursor-pointer 
            flex hover:-translate-y-1 transform transition-all duration-200 "
            >
              <FaSchool className="sm:text-2xl text-sm" color="white" />
              <h6 className="text-white font-medium text-sm sm:text-lg font-poppins">
                Dashboard
              </h6>
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="sm:px-6 sm:py-3 px-4 py-2 bg-primary-500 gap-3 items-center rounded-md
             cursor-pointer 
            flex hover:-translate-y-1 transform transition-all duration-200 "
            >
              <FiLogIn className="sm:text-2xl text-sm" color="white" />
              <h6 className="text-white font-medium text-sm sm:text-lg font-poppins">
                Login
              </h6>
            </Link>
          )}

          <button
            className="lg:hidden visible"
            onClick={() => setShowNavItems(true)}
          >
            <BiMenuAltRight size={50} className="text-primary-500" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
