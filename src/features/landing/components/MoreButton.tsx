import { FaCaretRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface PropsType {
  to: string;
  label: string;
}

const MoreButton: React.FC<PropsType> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="sm:max-w-[320px] max-w-[280px] h-[50px] border-2 border-[#33415C] flex justify-center
       sm:gap-3 gap-1 
      items-center mx-auto mt-20 cursor-pointer group relative px-2"
    >
      <h4
        className="font-poppins text-[#33415C] font-bold group-hover:text-white 
        transition-all duration-200 ease-in-out whitespace-nowrap"
      >
        {label}
      </h4>
      <FaCaretRight
        size={18}
        className="text-[#33415C] group-hover:text-white transition-all duration-200 ease-in-out
         translate-y-[1px]"
      />

      <div
        className="w-0 h-0 group-hover:w-full group-hover:h-full bg-[#33415C] absolute top-0 left-0 right-0 
        bottom-0 -z-10 transition-all duration-200 ease-in-out origin-center"
      ></div>
    </Link>
  );
};

export default MoreButton;
