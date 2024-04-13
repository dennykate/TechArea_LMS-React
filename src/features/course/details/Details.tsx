import { IconPencilMinus } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import CourseInformation from "./components/CourseInformation";
import CourseContent from "./components/CourseContent";
import useQuery from "@/hooks/useQuery";

const Details = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(`/courses/${courseId}`);

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
            src={data?.thumbnail}
            alt={data?.name}
            className="w-full object-cover"
          />
        </div>

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

      <div className="mt-6 ">
        <CourseInformation data={data} />
      </div>

      <div className="mt-4">
        <CourseContent data={data?.course_contents} />
      </div>
    </DetailsLayout>
  );
};

export default Details;
