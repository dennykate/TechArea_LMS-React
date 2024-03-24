import { Tabs } from "@mantine/core";
import {
  IconDeviceDesktopQuestion,
  IconCertificate,
} from "@tabler/icons-react";
import StudentCourses from "./StudentCourses";
import StudentQuizzes from "./StudentQuizzes";

const StudentCourseAndQuiz = () => {
  return (
    <Tabs defaultValue="courses">
      <Tabs.List>
        <Tabs.Tab
          className="text-base"
          value="courses"
          icon={<IconCertificate size={18} />}
        >
          Courses
        </Tabs.Tab>
        <Tabs.Tab
          className="text-base"
          value="quizzes"
          icon={<IconDeviceDesktopQuestion size={18} />}
        >
          Quizzes
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="courses" pt="md">
        <StudentCourses />
      </Tabs.Panel>

      <Tabs.Panel value="quizzes" pt="md">
        <StudentQuizzes />
      </Tabs.Panel>
    </Tabs>
  );
};

export default StudentCourseAndQuiz;
