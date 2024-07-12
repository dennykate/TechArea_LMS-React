import withPermissions from "@/hocs/withPermissions";
import DashCardContainer from "./components/DashCardContainer";
import DonutChartContainer from "./components/DonutChartContainer";
import TopAssignmentMarkStudents from "./components/TopStudents";
import { banRoles } from "@/data/banRoles";

const Dashboard = () => {
  return (
    <main className="w-full md:p-8 sm:p-4 p-2 md:py-8 py-6">
      <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 sm:gap-5 sm:mb-5 mb-2">
        <DashCardContainer />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 sm:gap-5 mb-5">
        <div className="w-full lg:min-h-[500px] h-auto bg-white rounded-[5px] sm:p-5 p-3 py-5 shadow-md">
          <DonutChartContainer
            baseURL="/dashboard/top-answer-quizzes"
            title="Popular Quizzes"
          />
        </div>
        <div className="w-full lg:min-h-[500px] h-auto bg-white rounded-[5px] sm:p-5 p-3 py-5 shadow-md">
          <DonutChartContainer
            baseURL="/dashboard/top-enroll-courses"
            title="Popular Lessons"
          />
        </div>
      </div>
      <div className="w-full h-auto bg-white rounded-[5px] sm:p-5 p-3 py-5 mb-5 shadow-md">
        <TopAssignmentMarkStudents
          title="Top Quiz Mark Students"
          baseURL="dashboard/top-answer-students"
        />
      </div>
      <div className="w-full h-auto bg-white rounded-[5px] sm:p-5 p-3 py-5 shadow-md">
        <TopAssignmentMarkStudents
          title="Top Assignment Mark Students"
          baseURL="dashboard/top-assignment-mark-students"
        />
      </div>
    </main>
  );
};

export default withPermissions(Dashboard, banRoles.dashboard);
