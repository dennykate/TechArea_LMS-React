/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { IoMdTime } from "react-icons/io";
import { LuUsers } from "react-icons/lu";
import { MdOutlineSchool, MdOutlineMeetingRoom } from "react-icons/md";
import Heading from "@/components/typography/Heading";

interface PropsType {
  data: any;
}

const LearnCourseInformation: React.FC<PropsType> = ({ data }) => {
  return (
    <div className="mt-6 space-y-4 px-2">
      <Heading tag="h1">{data?.name}</Heading>

      <p className="text-sm text-gray-500">
        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
      </p>

      <p className="text-sm text-gray-500">
        Created by -{" "}
        <Link to={""} className="underline text-gray-800">
          {data?.created_by}
        </Link>
      </p>

      <div className="sm:flex grid grid-cols-2 items-center sm:gap-4 gap-2">
        <div className="flex items-center gap-1">
          <IoMdTime size={18} />
          <p className="text-sm text-gray-800">{data?.created_at}</p>
        </div>

        <div className="flex items-center gap-1">
          <MdOutlineSchool size={18} />
          <p className="text-sm text-gray-800">{data?.grade}</p>
        </div>

        <div className="flex items-center gap-1">
          <MdOutlineMeetingRoom size={18} />
          <p className="text-sm text-gray-800">{data?.section}</p>
        </div>

        <div className="flex items-center gap-1">
          <LuUsers size={18} />
          <p className="text-sm text-gray-800">{data?.subject}</p>
        </div>
      </div>
    </div>
  );
};

export default LearnCourseInformation;
