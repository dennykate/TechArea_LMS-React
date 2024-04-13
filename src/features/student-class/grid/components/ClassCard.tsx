/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

import Heading from "@/components/typography/Heading";

interface PropsType {
  data: any;
}

const AssignmentCard: React.FC<PropsType> = ({ data }) => {
  return (
    <Link
      to={`/student-classes/${data?.id}`}
      className="w-full border border-black border-opacity-20 rounded shadow-sm overflow-hidden
       hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 ease-in-out bg-white
      relative "
    >
      <div className="w-full space-y-2  sm:p-3 p-2">
        <Heading tag="h6" className="line-clamp-2 sm:!text-base !text-sm">
          {data?.topic}
        </Heading>

        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Agenda - {data?.agenda}
        </p>

        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Start Time - {data?.start_time}
        </p>

        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Tr. {data?.created_by}
        </p>

        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          {data?.grade} • {data?.section}
        </p>
      </div>

      <div className="w-full h-[3px] absolute top-0 left-0 bg-primary-500" />
    </Link>
  );
};

export default AssignmentCard;
