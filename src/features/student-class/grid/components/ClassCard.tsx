import { Link } from "react-router-dom";

import Heading from "@/components/typography/Heading";

const AssignmentCard = () => {
  return (
    <Link
      to={"/student-classes/room/hello-world"}
      className="w-full border border-black border-opacity-20 rounded shadow-sm overflow-hidden
       hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 ease-in-out bg-white
      relative "
    >
      <div className="w-full space-y-2  sm:p-3 p-2">
        <Heading tag="h6" className="line-clamp-2 sm:!text-base !text-sm">
          Grade 10 Bio ( Chapter 10 )
        </Heading>

        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Tr. Thwe Thwe
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          04 April 2024 11:00 AM
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Grade - 10 • Section - C
        </p>
      </div>

      <div className="w-full h-[3px] absolute top-0 left-0 bg-primary-500" />
    </Link>
  );
};

export default AssignmentCard;
