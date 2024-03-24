import StudentCourseCard from "./StudentCourseCard";

const StudentCourses = () => {
  return (
    <div>
      <h2 className="sm:text-xl text-lg font-[400]">Learning Courses</h2>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {[0, 1, 2, 3].map((data) => (
          <StudentCourseCard key={data} />
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
