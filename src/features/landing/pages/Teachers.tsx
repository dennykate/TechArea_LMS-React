/* eslint-disable @typescript-eslint/no-explicit-any */
import MyPagination from "@/components/common/MyPagination";
import { Footer, Home } from "../components";

import { paragraph, subTitle, title } from "../data";
import { useCallback, useEffect, useState } from "react";
import config from "@/config";
import TeacherCard from "../components/TeacherCard";

const Teachers = () => {
  const [data, setData] = useState<any>();
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const getTeachers = useCallback(async () => {
    const res = await fetch(config.baseUrl + `/public/teachers?page=${page}`);
    const teachers = await res?.json();

    setTotal(teachers?.meta?.last_page);

    setData(teachers?.data);
  }, [page]);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  return (
    <>
      <Home />

      <div className="max-w-5xl mx-auto py-20 px-2">
        <div className="sm:w-2/3 w-full mx-auto text-center">
          <h6 className={subTitle}>Together We Can Create</h6>
          <h1 className={title}>Who Stand By Your Kids Always</h1>
          <p className={paragraph}>
            While the unit economics were a driving factor, the company says its
            acquisition of lidar company Blackmore and the integration of that
            tech in its self-driving stack has made the shift to trucks
            possible. Aurora has said its FirstLight.
          </p>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
          {data?.map((item: any, index: number) => (
            <TeacherCard key={index} data={item} />
          ))}
        </div>

        <div className="w-full flex justify-end mt-12">
          <MyPagination total={total} value={page} onChange={setPage} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Teachers;
