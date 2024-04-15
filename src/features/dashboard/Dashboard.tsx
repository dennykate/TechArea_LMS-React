import DashCardContainer from "./components/DashCardContainer";
import DonutChartContainer from "./components/DonutChartContainer";
import TopAssignmentMarkStudents from "./components/TopAssignmentMarkStudents";
import TopQuizAnswerStudents from "./components/TopQuizAnswerStudents";

const Dashboard = () => {
  return (
    <main className="w-full p-5">
      <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-5 sm:mb-5 mb-2">
        <DashCardContainer />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 sm:gap-5 mb-5">
        <div className="w-full lg:min-h-[500px] h-auto bg-white rounded-[5px] sm:p-5 p-3 py-5 shadow-md">
          <DonutChartContainer title="Popular Quizzes" />
        </div>
        <div className="w-full lg:min-h-[500px] h-auto bg-white rounded-[5px] sm:p-5 p-3 py-5 shadow-md">
          <DonutChartContainer title="Popular Courses" />
        </div>
      </div>
      <div className="w-full h-auto bg-white rounded-[5px] sm:p-5 p-3 py-5 shadow-md">
        <TopAssignmentMarkStudents />
      </div>
      <div className="w-full h-auto bg-white rounded-[5px] sm:p-5 p-3 py-5 shadow-md">
        <TopQuizAnswerStudents />
      </div>
    </main>
  );
};

export default Dashboard;
