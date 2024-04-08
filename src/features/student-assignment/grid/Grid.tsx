import Heading from "@/components/typography/Heading";
import StudentQuizFilterSearch from "./components/StudentAssignmentFilterSearch";

const Grid = () => {
  return (
    <div className="md:p-8 sm:p-4 p-2 md:py-8 py-6 space-y-4">
      <Heading tag="h1">Student Assignments</Heading>
      <StudentQuizFilterSearch />
    </div>
  );
};

export default Grid;
