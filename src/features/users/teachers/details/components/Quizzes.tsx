import MyPagination from "@/components/common/MyPagination";
import TeacherActivityCard from "./TeacherActivityCard";

const Quizzes = () => {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4">
        {[0, 1, 2, 3, 4, 5].map((data) => (
          <TeacherActivityCard key={data} />
        ))}
      </div>

      <div className="w-full flex justify-end mt-8">
        <MyPagination total={3} siblings={1} />
      </div>
    </>
  );
};

export default Quizzes;
