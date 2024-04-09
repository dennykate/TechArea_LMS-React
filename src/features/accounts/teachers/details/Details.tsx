/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "@mantine/core";
import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import TeacherInformation from "./components/TeacherInformation";
import TeacherCourseAndQuiz from "./components/TeacherCourseAndQuiz";
import { useState } from "react";
import useQuery from "@/hooks/useQuery";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(`/users/${teacherId}`, setData);

  return (
    <DetailsLayout
      isLoading={isLoading}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Teacher List", link: "/accounts/teachers/list" },
        { title: "Teacher Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        <div className="flex items-center justify-center gap-4">
          <Avatar
            src={data?.profile}
            alt={data?.name}
            size="xl"
            radius={"md"}
          />

          <div className="space-y-[2px]">
            <p className="text-2xl font-[400]">{data?.name}</p>
            <p className="text-sm font-[300]">
              {data?.role} , {data?.created_at}
            </p>
          </div>
        </div>

        <div className="sm:w-auto w-full flex justify-end">
          <MyButton
            onClick={() => navigate(`/accounts/teachers/edit/${teacherId}`)}
            leftIcon={<IconPencilMinus size={16} />}
          >
            Edit
          </MyButton>
        </div>
      </div>

      <div className="sm:mt-6 mt-3">
        <TeacherInformation data={data} />
      </div>

      <div className="sm:mt-6 mt-3">
        <TeacherCourseAndQuiz />
      </div>
    </DetailsLayout>
  );
};

export default Details;
