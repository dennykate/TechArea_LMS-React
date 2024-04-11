import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropsType {
  data: any;
}

const StudentInformation: React.FC<PropsType> = ({ data }) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
      <div className="">
        <h2 className="sm:text-xl text-lg font-[400]">Personal Information</h2>

        <div className="space-y-2 mt-2">
          <div className="grid grid-cols-3">
            <p className="sm:text-sm text-xs font-[300] text-black/70">
              Gender - <span className="underline">{data?.gender}</span>
            </p>
          </div>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Date of birth -{" "}
            <span className="underline">{data?.date_of_birth}</span>
          </p>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Entrance date -{" "}
            <span className="underline">{data?.created_at}</span>
          </p>
        </div>
      </div>

      <div className="">
        <h2 className="sm:text-xl text-lg font-[400]">Education Information</h2>

        <div className="space-y-2 mt-2">
          <div className="grid grid-cols-3">
            <p className="sm:text-sm text-xs font-[300] text-black/70 whitespace-nowrap">
              Grade - <span className="">{data?.grade}</span>
            </p>
          </div>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Section - <span className="">{data?.section}</span>
          </p>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Complete courses - <span className="">12</span>
          </p>
        </div>
      </div>

      <div className="md:col-span-1 sm:col-span-2 col-span-1">
        <h2 className="sm:text-xl text-lg font-[400]">Contact Information</h2>

        <div className="space-y-2 mt-2">
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Phone number -{" "}
            <a className="underline" href={`tel:${data?.phone}`}>
              {data?.phone}
            </a>
          </p>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Email -{" "}
            <a className="underline" href={`mailto:${data?.email}`}>
              {data?.email}
            </a>
          </p>
          <p className="sm:text-sm text-xs font-[300] text-black/70">
            Address - <span className="">{data?.address}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentInformation;
