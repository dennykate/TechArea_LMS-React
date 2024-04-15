/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import ImportantInformation from "./ImportantInformation";
import React from "react";
import { Link } from "react-router-dom";

interface PropsType {
  data?: any;
}

const StudentClassInformation: React.FC<PropsType> = ({ data }) => {
  return (
    <div className=" ">
      <div className="">
        <h2 className="sm:text-xl text-base font-[400] mb-5">Class Details</h2>

        <div className="space-y-2 mt-2">
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Topic
            </p>
            <span className="sm:text-sm text-xs">- {data?.topic}</span>
          </div>

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Agenda
            </p>
            <span className="sm:text-sm text-xs">- {data?.agenda}</span>
          </div>

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Start Time
            </p>
            <span className="sm:text-sm text-xs">- {data?.start_time}</span>
          </div>

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Created by
            </p>
            <span className="sm:text-sm text-xs">- {data?.created_by}</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Created at
            </p>
            <span className="sm:text-sm text-xs">- {data?.created_at}</span>
          </div>
        </div>

        <h2 className="sm:text-xl text-base font-[400] my-5">
          Important Information <span className="text-red-500"> ***</span>
        </h2>

        <div className="w-full flex items-center gap-6 flex-wrap">
          <ImportantInformation label="Meeting ID" value={data?.meeting_id} />

          <ImportantInformation
            label="Meeting Password"
            value={data?.meeting_password}
          />

          <Link to={data?.meeting_url} target="_blank">
            <MyButton size="lg" className="rounded-full">
              Direct Enter
            </MyButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentClassInformation;
