/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs } from "@mantine/core";
import { MdOutlinePeopleAlt, MdOutlineQuestionMark } from "react-icons/md";
import { IconPencilMinus } from "@tabler/icons-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import QuizInformation from "./components/QuizInformation";
import QuizQuestion from "./components/QuizQuestion";
import AnswerStudents from "./components/AnswerStudents";
import { useState } from "react";
import useQuery from "@/hooks/useQuery";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
// import useUserInfo from "@/hooks/use-user-info";
import checkPermission from "@/utilities/check-permission";
import MyCarousel from "@/components/common/MyCarousel";
import Heading from "@/components/typography/Heading";

const Details = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [searchParams] = useSearchParams();
  // const userInfo = useUserInfo();

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
      {checkPermission(data?.created_by_id) && (
        <div className="sm:w-auto w-full flex justify-end">
          <div>
            <MyButton
              onClick={() =>
                navigate(
                  `/quizzes/edit/${quizId}?lesson_id=${searchParams.get(
                    "lesson_id"
                  )}`
                )
              }
              leftIcon={<IconPencilMinus size={16} />}
            >
              Edit
            </MyButton>
          </div>
        </div>
      )}

      <div className="">
        <QuizInformation data={data} />
      </div>
      {data?.medias?.length > 0 && (
        <div className="mt-6 flex flex-col gap-2 sm:text-sm text-xs font-[300] text-black/70">
          <Heading tag="h3" className="text-black mb-3">Attached Files</Heading>
          <MyCarousel
            slides={data?.medias}
            height={300}
            className="h-[300px]"
          />
        </div>
      )}

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
