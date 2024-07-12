import Heading from "@/components/typography/Heading";
import StudentQuizFilterSearch from "./components/StudentAssignmentFilterSearch";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Grid = () => {
  return (
    <div className="md:p-8 sm:p-4 p-2 md:py-8 py-6 space-y-4">
      <Heading tag="h1">Homework</Heading>
      <StudentQuizFilterSearch />
    </div>
  );
};

export default withPermissions(Grid, banRoles.student_assignments);
