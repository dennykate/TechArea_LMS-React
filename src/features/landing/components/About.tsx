import { BsFillCheckCircleFill } from "react-icons/bs";

import LearnChildren from "../../../assets/learn-children.jpg";
import Rocket from "../../../assets/rocket.png";
// import ChildrenPlaying from "../assets/children-playing.png";

import { paragraph, subTitle, title } from "../data";

const About = () => {
  // const randomPosition = () => {
  //   const top = Math.floor(Math.random() * 99);
  // };

  return (
    <div
      id="about us"
      className="md:py-24 py-12 bg-white relative"
    >
      <div className="flex lg:flex-row flex-col sm:px-10 xs:px-3 px-1 justify-center items-center">
        <div className="lg:w-1/2 w-full z-10">
          <img src={LearnChildren} alt="learn-children" className="w-full" />
        </div>
        <div className="lg:w-1/2 w-full lg:ml-10 ml-0 lg:mt-0 mt-5 px-2">
          <h6 className={subTitle}>Education For Everyone</h6>
          <h3 className={title}>Learn About Our Work Culture At Devschool</h3>
          <p className={paragraph}>
            As a word from our heart, we love to dedicate for Kids the valuable
            things in Life. A great education is a must for a solid developments
            in both soul and mind for kids. We go with kids to play, learn, and
            grow better.
          </p>
          <div className="grid grid-cols-2 mt-5 sm:gap-7 gap-3">
            <div className="flex sm:gap-3 gap-1 items-center ">
              <BsFillCheckCircleFill size={22} className="text-primary" />
              <p className=" font-poppins md:text-base xs:text-sm text-xs">
                Transportation
              </p>
            </div>
            <div className="flex sm:gap-3 gap-1 items-center">
              <BsFillCheckCircleFill size={22} className="text-primary" />
              <p className=" font-poppins md:text-base xs:text-sm text-xs">
                Outdoor Games
              </p>
            </div>
            <div className="flex sm:gap-3 gap-1 items-center">
              <BsFillCheckCircleFill size={22} className="text-primary" />
              <p className=" font-poppins md:text-base xs:text-sm text-xs">
                Nutritious Food
              </p>
            </div>
            <div className="flex sm:gap-3 gap-1 items-center">
              <BsFillCheckCircleFill size={22} className="text-primary" />
              <p className=" font-poppins md:text-base xs:text-sm text-xs">
                Best Care
              </p>
            </div>
          </div>
          <p className={paragraph}>
            As a word from our heart, we love to dedicate for Kids the valuable
            things in Life . We go with kids to play, learn, and grow better.
          </p>
        </div>
      </div>

      <img
        src={Rocket}
        alt="rocket"
        className="absolute bottom-5 sm:right-8 right-3  sm:w-14 w-10 animate-bounce"
      />
    </div>
  );
};

export default About;
