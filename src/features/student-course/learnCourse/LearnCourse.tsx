/* eslint-disable @typescript-eslint/no-explicit-any */
import LearnCourseInformation from "./components/LearnCourseInformation";
import LearnCourseContent from "./components/LearnCourseContent";
import NavLayout from "@/components/layouts/NavLayout";
import { useParams } from "react-router-dom";
import useQuery from "@/hooks/useQuery";
import { useState } from "react";
import { Loader } from "@mantine/core";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const LearnCourse = () => {
  const { courseId } = useParams();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(`/courses/${courseId}`, setData);

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <NavLayout>
      <div className="max-w-2xl mx-auto mb-8">
        <div className="w-full flex justify-center items-center">
          <img
            src={data?.thumbnail}
            alt={data?.name}
            className="h-[300px] object-cover"
          />
        </div>

        <LearnCourseInformation data={data} />

        <LearnCourseContent contents={data?.course_contents} />
      </div>
    </NavLayout>
  );
};

export default withPermissions(LearnCourse, banRoles.student_courses);
