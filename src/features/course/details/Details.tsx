import { IconPencilMinus } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import CourseInformation from "./components/CourseInformation";
import CourseContent from "./components/CourseContent";
import useQuery from "@/hooks/useQuery";
import { Tabs } from "@mantine/core";
import LearningStudents from "./components/LearningStudents";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
import HomeworkList from "./components/HomeworkList";
import TestList from "./components/TestList";
import checkPermission from "@/utilities/check-permission";

const Details = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(`/courses/${courseId}`);

  return (
    <DetailsLayout
      linkItems={
        [
          // { title: "Dashboard", link: "/dashboard" },
          // { title: "Lesson List", link: "/courses/list" },
          // { title: "Lesson Details", link: "" },
        ]
      }
      backBtn
    >
      {checkPermission(data?.created_by_id) && (
        <div className="w-full flex justify-between mb-2 sm:items-end items-start sm:flex-row flex-col gap-3">
          <div className="sm:w-auto w-full flex justify-end">
            <div>
              <MyButton
                onClick={() => navigate(`/courses/edit/${data?.id}`)}
                leftIcon={<IconPencilMinus size={16} />}
              >
                Edit
              </MyButton>
            </div>
          </div>
        </div>
      )}

      <div className="w-[300px]">
        <img src={data?.thumbnail} alt="" className="w-full object-cover" />
      </div>

      <div className="mt-6 ">
        <CourseInformation data={data} />
      </div>

      <div className="mt-4">
        <Tabs defaultValue="contents">
          <Tabs.List>
            <Tabs.Tab value="contents">Lesson Contents</Tabs.Tab>
            <Tabs.Tab value="students">Learning Students</Tabs.Tab>
            <Tabs.Tab value="homework">Homework</Tabs.Tab>
            <Tabs.Tab value="tests">Tests</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="contents" pt="xs">
            <CourseContent data={data?.course_contents} />
          </Tabs.Panel>

          <Tabs.Panel value="students" pt="xs">
            <LearningStudents />
          </Tabs.Panel>
          <Tabs.Panel value="homework" pt="xs">
            <HomeworkList gradeId={data?.grade_id} />
          </Tabs.Panel>
          <Tabs.Panel value="tests" pt="xs">
            <TestList gradeId={data?.grade_id} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </DetailsLayout>
  );
};

export default withPermissions(Details, banRoles.courses);
