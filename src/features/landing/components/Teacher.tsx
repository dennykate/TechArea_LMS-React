/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-irregular-whitespace */
// import { FaCaretRight } from "react-icons/fa";

import { useCallback, useEffect, useState } from "react";
import { paragraph, subTitle, title } from "../data";
import TeacherCard from "./TeacherCard";
import config from "@/config";
import MoreButton from "./MoreButton";

const Teacher = () => {
  const [data, setData] = useState<any>();

  const getTeachers = useCallback(async () => {
    const res = await fetch(config.baseUrl + "/public/teachers?limit=4");
    const teachers = await res?.json();

    setData(teachers?.data);
  }, []);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  return (
    <div id="teachers" className="w-full pt-28 px-2">
      <div className="sm:w-2/3 w-full mx-auto text-center">
        <h6 className={subTitle}>Together We Can Create</h6>
        <h1 className={title}>Who Stand By Your Kids Always</h1>
        <p className={paragraph}>
          While the unit economics were a driving factor, the company says its
          acquisition of lidar company Blackmore and the integration of that
          tech in its self-driving stack has made the shift to trucks possible.
          Aurora has said its FirstLight.
        </p>
      </div>
      <div className="my-14 grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-1 gap-10 sm:px-5 px-1">
        {data?.map((dt: any, index: number) => (
          <TeacherCard key={index} data={dt} />
        ))}
      </div>
      <MoreButton to="/pub-teachers" label="Discover More Teachers" />
    </div>
  );
};

export default Teacher;
