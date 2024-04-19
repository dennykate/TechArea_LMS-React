/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

import Heading from "@/components/typography/Heading";
import React from "react";

interface PropsType {
  data: any;
}

const ZoomRecordCard: React.FC<PropsType> = ({ data }) => {
  return (
    <Link
      to={`/student-zoom-records/details/${data?.id}`}
      className="w-full border border-black border-opacity-20 rounded shadow-sm overflow-hidden
       hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 ease-in-out bg-white
       "
    >
      <div className="w-full sm:h-[150px] h-[130px] relative">
        {data?.image ? (
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center ">
            <img
              src="/logo.png"
              alt="logo"
              className="w-[80px] h-[80px] object-cover"
            />
          </div>
        )}
      </div>

      <div className="w-full space-y-2  sm:p-3 p-2">
        <Heading tag="h6" className="line-clamp-2 sm:!text-base !text-sm">
          {data?.title}
        </Heading>
        <Heading tag="h6" className="line-clamp-2 sm:!text-base !text-sm">
          {data?.created_at}
        </Heading>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Tr. {data?.created_by}
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          {data?.grade} • {data?.section}
        </p>
      </div>
    </Link>
  );
};

export default ZoomRecordCard;
