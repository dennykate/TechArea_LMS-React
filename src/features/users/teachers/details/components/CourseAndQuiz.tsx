import { Tabs } from "@mantine/core";
import {
  IconDeviceDesktopQuestion,
  IconCertificate,
} from "@tabler/icons-react";
import Courses from "./Courses";
import Quizzes from "./Quizzes";

const CourseAndQuiz = () => {
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
        <Courses />
      </Tabs.Panel>

      <Tabs.Panel value="quizzes" pt="md">
        <Quizzes />
      </Tabs.Panel>
    </Tabs>
  );
};

export default CourseAndQuiz;
