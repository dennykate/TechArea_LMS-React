/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import VideoPlayer from "@/components/common/VideoPlayer";
import Heading from "@/components/typography/Heading";
import useMutate from "@/hooks/useMutate";
import alertActions from "@/utilities/alertActions";

interface PropsType {
  data: any;
}

const LearnCourseContentCard: React.FC<PropsType> = ({ data }) => {
  const [onSubmit] = useMutate();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="max-h-[300px]">
        {(data?.content_type == "video" || data?.content_type == "youtube") && (
          <VideoPlayer url={data?.content} type={data?.content_type} />
        )}
      </div>

      <div className=" space-y-2 px-[6px] mt-4">
        <Heading tag="h6">{data?.name}</Heading>
        <p className="text-sm text-gray-500">
          <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </p>

        <p className="text-sm text-gray-500">Created At - {data?.created_at}</p>
        <p className="text-sm text-gray-500">
          Status - {data?.is_complete ? "Completed" : " Not Complete"}
        </p>

        <div className="flex justify-end items-center gap-2 mt-4">
          <MyButton
            onClick={() =>
              alertActions(
                () => onSubmit(`/course-contents/${data?.id}/complete`),
                "Are you sure ?"
              )
            }
          >
            Make As Complete
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default LearnCourseContentCard;
