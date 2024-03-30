import { Tabs } from "@mantine/core";
import { IconPencilMinus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { MdContentPaste, MdOutlinePeopleAlt } from "react-icons/md";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import CourseInformation from "./components/CourseInformation";
import CourseContent from "./components/CourseContent";
import EnrollStudents from "./components/EnrollStudents";

const Details = () => {
  const navigate = useNavigate();

  return (
    <DetailsLayout
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Course List", link: "/courses/list" },
        { title: "Course Details", link: "" },
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
        <CourseInformation />
      </div>

      <div className="mt-4">
        <Tabs defaultValue="content">
          <Tabs.List>
            <Tabs.Tab
              value="content"
              icon={<MdContentPaste size={16} />}
              className="text-base"
            >
              Contents
            </Tabs.Tab>

            <Tabs.Tab
              value="enroll-students"
              icon={<MdOutlinePeopleAlt size={16} />}
              className="text-base"
            >
              Enroll Students
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="content" pt="xl">
            <CourseContent />
          </Tabs.Panel>

          <Tabs.Panel value="enroll-students" pt="">
            <EnrollStudents />
          </Tabs.Panel>
        </Tabs>
      </div>
    </DetailsLayout>
  );
};

export default Details;
