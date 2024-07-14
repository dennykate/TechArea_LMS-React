/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import AssignmentInformation from "./components/AssignmentInformation";
import Heading from "@/components/typography/Heading";
import AssignmentStudentTable from "./components/AssignmentStudentTable";
import useQuery from "@/hooks/useQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import MediaViewer from "@/components/common/MediaViewer";

const Details = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(`/assignments/${assignmentId}`, setData);

  return (
    <DetailsLayout
      isLoading={isLoading}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Homework List", link: "/assignments/list" },
        { title: "Homework Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        <Heading tag="h1">{data?.title}</Heading>

        <div className="sm:w-auto w-full flex justify-end">
          <MyButton
            onClick={() => navigate(`/assignments/edit/${assignmentId}`)}
            leftIcon={<IconPencilMinus size={16} />}
          >
            Edit
          </MyButton>
        </div>
      </div>

      <div className="sm:mt-6 mt-3">
        <AssignmentInformation data={data} />

        {data?.attachments?.length > 0 && (
          <div className="mt-2 flex flex-col gap-2 sm:text-sm text-xs font-[300] text-black/70">
            <p>Lessons</p>

            <div className="sm:w-[500px] w-[300px]">
              <MediaViewer attachments={data?.attachments} />
            </div>
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
