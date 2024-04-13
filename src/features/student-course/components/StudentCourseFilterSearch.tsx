/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseCard from "./CourseCard";
import MyPagination from "@/components/common/MyPagination";
import SubjectLayout from "@/components/layouts/SubjectLayout";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import useQuery from "@/hooks/useQuery";
import { useMemo, useState } from "react";

const StudentCourseFilterSearch = () => {
  const { get } = useEncryptStorage();
  const [subjectId, setSubjectId] = useState<string>("");

  const userInfo = useMemo(() => JSON.parse(get("userInfo") as string), []);

  const { data } = useQuery(`/courses?filter[subject_id]=${subjectId}`);

  return (
    <SubjectLayout gradeId={userInfo?.grade_id} setSubjectId={setSubjectId}>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-2">
        {data.map((dt: any) => (
          <CourseCard key={dt} data={dt}/>
        ))}
      </div>

      <div className="w-full flex justify-end">
        <MyPagination total={5} />
      </div>
    </SubjectLayout>
  );
};

export default StudentCourseFilterSearch;
