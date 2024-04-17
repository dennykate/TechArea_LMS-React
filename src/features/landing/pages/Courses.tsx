/* eslint-disable @typescript-eslint/no-explicit-any */
import MyPagination from "@/components/common/MyPagination";
import { Footer, Home } from "../components";
import CourseCard from "../components/CourseCard";
import { subTitle, title } from "../data";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import { useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";
import config from "@/config";

const Courses = () => {
  const [data, setData] = useState<any>();
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const form = useForm({
    initialValues: {
      grade_id: "ce4d3be5-f739-4860-abd3-e8410f08b975",
      section_id: "",
    },
  });

  const getCourses = useCallback(async () => {
    const res = await fetch(
      config.baseUrl +
        `/public/courses?limit=4&filter[grade_id]=${form.values.grade_id}&filter[section_id]=${form.values.section_id}&page=${page}`
    );
    const courses = await res?.json();

    setTotal(courses?.meta?.last_page);

    setData(courses?.data);
  }, [form.values.grade_id, form.values.section_id]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <>
      <Home />

      <div className="max-w-5xl mx-auto py-20 px-2">
        <div className="w-2/3 mx-auto text-center">
          <h6 className={subTitle}>Education For Everyone</h6>
          <h3 className={title}>Learn About Our Work Culture At Devschool</h3>
        </div>

        <div className="w-full flex justify-center items-center mt-4">
          <GradeSectionSubject
            usage={["grade", "section"]}
            hideLabel
            form={form}
          />
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
          {data?.map((data: any, index: number) => (
            <CourseCard key={index} data={data} />
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

export default Courses;
