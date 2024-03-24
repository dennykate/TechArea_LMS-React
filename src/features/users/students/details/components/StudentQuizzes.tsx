import MyPagination from "@/components/common/MyPagination";
import StudentActivityCard from "./StudentActivityCard";

const StudentQuizzes = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {[0, 1, 2, 3].map((data) => (
          <StudentActivityCard key={data} />
        ))}
      </div>

      <div className="flex mt-8  justify-end">
        <MyPagination total={5} siblings={1} />
      </div>
    </>
  );
};

export default StudentQuizzes;
