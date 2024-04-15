/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface PropsType {
  data: any;
}

const TeacherInformation: React.FC<PropsType> = ({ data }) => {
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

      <div className="md:col-span-2 sm:col-span-2 col-span-1">
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

export default TeacherInformation;
