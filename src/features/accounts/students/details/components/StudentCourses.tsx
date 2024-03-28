import MyPagination from "@/components/common/MyPagination";
import StudentActivityCard from "./StudentActivityCard";

const StudentCourses = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {[0, 1, 2, 3].map((data) => (
          <StudentActivityCard key={data} />
        ))}
      </div>

      <div className="w-full flex justify-end mt-8">
        <MyPagination total={5} siblings={1} />
      </div>
    </>
  );
};

export default StudentCourses;
