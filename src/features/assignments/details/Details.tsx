/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import AssignmentInformation from "./components/AssignmentInformation";
import Heading from "@/components/typography/Heading";
import AssignmentStudentTable from "./components/AssignmentStudentTable";
import useQuery from "@/hooks/useQuery";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";

// import useUserInfo from "@/hooks/use-user-info";
import checkPermission from "@/utilities/check-permission";
import MyCarousel from "@/components/common/MyCarousel";

const Details = () => {
  const { assignmentId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  // const userInfo = useUserInfo();

  const { isLoading } = useQuery(`/assignments/${assignmentId}`, setData);

  console.log("homework data=>", data);

  return (
    <DetailsLayout
      isLoading={isLoading}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        {
          title: "Homework List",
          link: `/courses/details/${searchParams.get("lesson_id")}`,
        },
        { title: "Homework Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        <Heading tag="h1">{data?.title}</Heading>

        {checkPermission(data?.created_by_id) && (
          <div className="sm:w-auto w-full flex justify-end">
            <MyButton
              onClick={() =>
                navigate(
                  `/assignments/edit/${assignmentId}?lesson_id=${searchParams.get(
                    "lesson_id"
                  )}`
                )
              }
              leftIcon={<IconPencilMinus size={16} />}
            >
              Edit
            </MyButton>
          </div>
        )}
      </div>

      <div className="sm:mt-6 mt-3">
        <AssignmentInformation data={data} />

        {data?.medias?.length > 0 && (
          <div className="mt-2 flex flex-col gap-2 sm:text-sm text-xs font-[300] text-black/70">
            <p className="text-lg font-medium text-black">Lessons</p>
            <MyCarousel slides={data?.medias} height={300} className="h-[300px]" />
          </div>
        )}
      </div>

      <div className="sm:mt-6 mt-3">
        <AssignmentStudentTable assignmentMarks={data?.marks} />
      </div>
    </DetailsLayout>
  );
};

export default Details;
