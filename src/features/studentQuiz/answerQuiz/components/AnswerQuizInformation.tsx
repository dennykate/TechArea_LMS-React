import { Link } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { MdOutlineSchool, MdOutlineMeetingRoom } from "react-icons/md";
import Heading from "@/components/typography/Heading";

const AnswerQuizInformation = () => {
  return (
    <div className="mt-6 space-y-4 px-2">
      <Heading tag="h1">Grade 12 - ( English Intermediate )</Heading>

      <p className="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, corrupti
        consequatur. Nesciunt, deleniti aliquam! Eos quos ad, illum numquam,
        alias vitae quibusdam expedita exercitationem eius nam excepturi.
        Exercitationem, ratione et?
      </p>

      <p className="text-sm text-gray-500">
        Created by -{" "}
        <Link to={""} className="underline text-gray-800">
          Ma Ma Thwe
        </Link>
      </p>

      <div className="sm:flex grid grid-cols-2 items-center sm:gap-4 gap-2">
        <div className="flex items-center gap-1">
          <IoMdTime size={18} />
          <p className="text-sm text-gray-800">01 Dec 2000</p>
        </div>

        <div className="flex items-center gap-1">
          <MdOutlineSchool size={18} />
          <p className="text-sm text-gray-800">Grade - 10</p>
        </div>

        <div className="flex items-center gap-1">
          <MdOutlineMeetingRoom size={18} />
          <p className="text-sm text-gray-800">Section - A</p>
        </div>

        <div className="flex items-center gap-1">
          <LuUsers size={18} />
          <p className="text-sm text-gray-800">1,001</p>
        </div>
      </div>
    </div>
  );
};

export default AnswerQuizInformation;
