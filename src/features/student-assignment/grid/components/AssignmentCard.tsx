/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, RingProgress } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import Heading from "@/components/typography/Heading";
import React from "react";

interface PropsType {
  data: any;
}

const AssignmentCard: React.FC<PropsType> = ({ data }) => {
  return (
    <Link
      to={`/student-assignments/submit/${data?.id}`}
      className="w-full border border-black border-opacity-20 rounded shadow-sm overflow-hidden
       hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 ease-in-out bg-white
       "
    >
      <div className="w-full sm:h-[150px] h-[130px] relative">
        <img
          src={data?.file}
          alt={data?.title}
          className="w-full h-full object-cover"
        />

        {data?.my_assignment_report && (
          <div className="absolute bottom-[-9px] right-[-6px] p-[4px] bg-white rounded-full">
            <RingProgress
              sections={[{ value: 100, color: "teal" }]}
              size={50}
              thickness={4}
              label={
                <Center>
                  {data?.my_assignment_report?.marks ? (
                    <p className="text-sm font-[400] ">
                      {data?.my_assignment_report?.marks}
                    </p>
                  ) : (
                    <IconCheck size={20} color="teal" />
                  )}
                </Center>
              }
            />
          </div>
        )}
      </div>

      <div className="w-full space-y-2  sm:p-3 p-2">
        <Heading tag="h6" className="line-clamp-2 sm:!text-base !text-sm">
          {data?.title}
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
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          {data?.marks} Marks. {data?.deadline} ( Deadline )
        </p>
      </div>
    </Link>
  );
};

export default AssignmentCard;
