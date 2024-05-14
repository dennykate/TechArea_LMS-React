import React from "react";
import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropsType {
  data: any;
}

const ZoomInformation: React.FC<PropsType> = ({ data }) => {
  return (
    <div className=" ">
      <div className="">
        <h2 className="sm:text-xl text-base font-[400] mb-5">
          Zoom Meeting Details
        </h2>

        <div className="space-y-2 mt-2">
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Agenda
            </p>
            <span className="sm:text-sm text-xs">- {data?.agenda}</span>
          </div>

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Topic
            </p>
            <p className="sm:text-sm text-xs w-[90%]">- {data?.topic}</p>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Start Time
            </p>
            <span className="sm:text-sm text-xs">- {data?.start_time}</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Grade
            </p>
            <span className="sm:text-sm text-xs">- {data?.grade}</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Section
            </p>
            <span className="sm:text-sm text-xs">- {data?.section}</span>
          </div>
          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Subject
            </p>
            <span className="sm:text-sm text-xs">- {data?.subject}</span>
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

          <hr />

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Meeting Id
            </p>
            <span className="sm:text-sm text-xs">- {data?.meeting_id}</span>
          </div>

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Meeting Password
            </p>
            <span className="sm:text-sm text-xs">
              - {data?.meeting_password}
            </span>
          </div>

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Meeting Duration
            </p>
            <span className="sm:text-sm text-xs">
              - {data?.meeting_duration}
            </span>
          </div>

          <div className="flex gap-1">
            <p className="sm:text-sm text-xs text-black/70 font-medium min-w-[80px]">
              Meeting URL
            </p>
            <Link
              to={data?.meeting_url}
              target="_blank"
              className="sm:text-sm text-xs underline text-primary"
            >
              - {data?.meeting_url}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomInformation;
