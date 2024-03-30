import { Tabs } from "@mantine/core";
import { MdOutlinePeopleAlt, MdOutlineQuestionMark } from "react-icons/md";
import { IconPencilMinus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import QuizInformation from "./components/QuizInformation";
import QuizQuestion from "./components/QuizQuestion";
import AnswerStudents from "./components/AnswerStudents";

const Details = () => {
  const navigate = useNavigate();

  return (
    <DetailsLayout
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Quiz List", link: "/quizzes/list" },
        { title: "Quiz Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        <div className="sm:w-[400px] w-full">
          <img
            src="https://i.postimg.cc/rmQCLwT8/1600w-w-K95f3-XNRa-M.webp"
            alt="thumbnail"
            className="w-full object-cover"
          />
        </div>

        <div className="sm:w-auto w-full flex justify-end">
          <div>
            <MyButton
              onClick={() => navigate("/courses/edit/1")}
              leftIcon={<IconPencilMinus size={16} />}
            >
              Edit
            </MyButton>
          </div>
        </div>
      </div>

      <div className="mt-6 ">
        <QuizInformation />
      </div>

      <div className="mt-6 ">
        <Tabs defaultValue="content">
          <Tabs.List>
            <Tabs.Tab
              value="content"
              icon={<MdOutlineQuestionMark size={16} />}
              className="text-base"
            >
              Questions
            </Tabs.Tab>

            <Tabs.Tab
              value="answer-students"
              icon={<MdOutlinePeopleAlt size={16} />}
              className="text-base"
            >
              Answer Students
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="content" pt="xl">
            <QuizQuestion />
          </Tabs.Panel>

          <Tabs.Panel value="answer-students" pt="xl">
            <AnswerStudents />
          </Tabs.Panel>
        </Tabs>
      </div>
    </DetailsLayout>
  );
};

export default Details;
