/* eslint-disable @typescript-eslint/no-explicit-any */
import ClassCard from "./CourseCard";
import { paragraph, subTitle, title } from "../data";
import MoreButton from "./MoreButton";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import { useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";
import config from "@/config";

const Class = () => {
  const [data, setData] = useState<any>();
  const form = useForm({
    initialValues: {
      grade_id: "",
      section_id: "",
    },
  });

  const getCourses = useCallback(async () => {
    const res = await fetch(
      config.baseUrl +
        `/public/events?limit=4?filter[grade_id]=${form.values.grade_id}&filter[section_id]=${form.values.section_id}`
    );
    const courses = await res?.json();

    setData(courses?.data);
  }, [form]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <div id="courses" className="w-full sm:py-20  py-5">
      <div className="md:w-2/3 w-11/12 mx-auto text-center py-5 flex justify-center items-center flex-col">
        <h6 className={subTitle}>Education For Everyone</h6>
        <h3 className={title}>Learn About Our Work Culture At Devschool</h3>
        <p className={paragraph}>
          As a word from our heart, we love to dedicate for Kids the valuable
          things in Life. A great education is a must for a solid developments
          in both soul and mind for kids. We go with kids to play, learn, and
          grow better.
        </p>
      </div>

      <div className="w-full flex justify-center items-center mt-4">
        <GradeSectionSubject
          usage={["grade", "section"]}
          hideLabel
          form={form}
        />
      </div>

      <div className="mt-10 grid lg:grid-cols-3 grid-cols-1 gap-10 sm:px-10 px-2">
        {data?.map((item: any, index: number) => (
          <ClassCard data={item} key={index} />
        ))}
      </div>

      <MoreButton to="/courses" label="Discover More Courses" />
    </div>
  );
};

export default Class;
