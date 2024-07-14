import Heading from "@/components/typography/Heading";
import StudentCourseFilterSearch from "./components/StudentCourseFilterSearch";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const StudentCourse = () => {
  return (
    <div className="md:p-8 sm:p-4 p-2 md:py-8 py-6 space-y-4">
      <Heading tag="h1">Lessons</Heading>
      <StudentCourseFilterSearch />
    </div>
  );
};

export default withPermissions(StudentCourse, banRoles.student_courses);
