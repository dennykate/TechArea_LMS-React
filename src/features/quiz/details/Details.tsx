/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs } from "@mantine/core";
import { MdOutlinePeopleAlt, MdOutlineQuestionMark } from "react-icons/md";
import { IconPencilMinus } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import QuizInformation from "./components/QuizInformation";
import QuizQuestion from "./components/QuizQuestion";
import AnswerStudents from "./components/AnswerStudents";
import { useState } from "react";
import useQuery from "@/hooks/useQuery";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Details = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(`/quizzes/${quizId}`, setData);

  return (
    <DetailsLayout
      isLoading={isLoading}
      linkItems={
        [
          // { title: "Dashboard", link: "/dashboard" },
          // { title: "Test List", link: "/quizzes/list" },
          // { title: "Test Details", link: "" },
        ]
      }
      backBtn
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        <div className="sm:w-[400px] w-full">
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full object-cover"
          />
        </div>

        <div className="sm:w-auto w-full flex justify-end">
          <div>
            <MyButton
              onClick={() => navigate(`/quizzes/edit/${quizId}`)}
              leftIcon={<IconPencilMinus size={16} />}
            >
              Edit
            </MyButton>
          </div>
        </div>
      </div>

      <div className="mt-6 ">
        <QuizInformation data={data} />
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
            <QuizQuestion questions={data?.questions} />
          </Tabs.Panel>

          <Tabs.Panel value="answer-students" pt="xl">
            <AnswerStudents />
          </Tabs.Panel>
        </Tabs>
      </div>
    </DetailsLayout>
  );
};

export default withPermissions(Details, banRoles.quizzes);
