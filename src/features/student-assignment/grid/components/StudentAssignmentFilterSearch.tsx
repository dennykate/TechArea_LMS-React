import AssignmentCard from "./AssignmentCard";
import MyPagination from "@/components/common/MyPagination";
import SubjectLayout from "@/components/layouts/SubjectLayout";

const StudentAssignmentFilterSearch = () => {
  return (
    <SubjectLayout>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((dt) => (
          <AssignmentCard key={dt} />
        ))}
      </div>

      <div className="w-full flex justify-end">
        <MyPagination total={5} />
      </div>
    </SubjectLayout>
  );
};

export default StudentAssignmentFilterSearch;
