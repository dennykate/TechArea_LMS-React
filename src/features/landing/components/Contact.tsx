import { BiSolidRightArrow } from "react-icons/bi";
const Contact = () => {
  return (
    <div
      id="contact"
      className="w-full sm:py-28 py-20 bg-[#33415C] text-center relative"
    >
      <h6 className="text-base font-bold sm:text-2xl text-[#FFAB4A]">
        Join Our New Session
      </h6>
      <h1
        className="md:text-[50px] sm:text-[40px] xs:text-[30px] text-[25px] font-bold text-white 
      font-poppins "
      >
        Call To Enroll Your <br /> Child +256 6425 789
      </h1>

      <a
        className="max-w-[230px] h-[60px] border-[2px] border-white flex justify-center items-center gap-4
        cursor-pointer relative p-0 group mx-auto mt-10"
        href="tel:09964470356"
      >
        <p
          className=" font-sans font-medium sm:text-lg text-base text-white group-hover:text-gray-600
          transition-all duration-200 ease-in-out z-10 -translate-y-[2px]"
        >
          Call Now
        </p>
        <BiSolidRightArrow
          size={14}
          className="text-white group-hover:text-gray-600 transition-all duration-200 ease-in-out z-10"
        />

        <div
          className="w-0 h-0 group-hover:w-[101%] group-hover:h-[103%] -translate-y-[1px] -translate-x-[1px]
             bg-white  absolute top-0 left-0 right-0 bottom-0 transition-all duration-200 ease-in-out"
        ></div>
      </a>
    </div>
  );
};

export default Contact;
