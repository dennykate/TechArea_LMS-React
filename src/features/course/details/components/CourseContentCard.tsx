/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import Heading from "@/components/typography/Heading";
import { Badge, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendarMonth,
  IconPencilMinus,
  IconTrash,
} from "@tabler/icons-react";
import EditCourseContent from "./EditCourseContent";
import React from "react";
import useMutate from "@/hooks/useMutate";
import alertActions from "@/utilities/alertActions";

interface PropsType {
  data: any;
}

const CourseContentCard: React.FC<PropsType> = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [onSubmit] = useMutate({
    navigateBack: false,
  });

  return (
    <>
      <div
        className="w-full border rounded-sm border-black border-opacity-20 p-2 shadow-md
     flex items-start lg:gap-4 gap-2 relative  lg:flex-row flex-col"
      >
        {data?.content_type == "image" && (
          <div className="lg:w-[300px] w-full h-[200px] rounded-sm overflow-hidden ">
            <img
              src={data?.content}
              alt="thumbnail"
              className="
         w-full h-full object-cover"
            />
          </div>
        )}

        {data?.content_type == "video" && (
          <div className="lg:w-[300px] w-full h-[200px] rounded-sm overflow-hidden ">
            <video
              src={data?.content}
              className="
         w-full h-full object-cover"
              controls
            />
          </div>
        )}

        <div className=" space-y-3 w-full lg:w-[calc(100%-300px)] py-2">
          <div className="w-[calc(100%-80px)]">
            <Heading tag="h6">{data?.name}</Heading>
          </div>
          <p className="text-sm font-[300] text-gray-500">
            {data?.description}
          </p>
          {data?.timmer !== 0 && (
            <p className="text-sm font-[300] text-gray-500">
              duration - {data?.timmer} minute(s)
            </p>
          )}
          <div className="flex flex-col gap-3 items-start !mt-4">
            {/* <Badge size="md" color="red" leftSection={<IconUser size={16} />}>
              {data?.created_by}
            </Badge> */}
            <Badge
              size="md"
              color="teal"
              leftSection={<IconCalendarMonth size={16} />}
            >
              {data?.created_at}
            </Badge>
          </div>
        </div>

        <div className="absolute sm:top-2 sm:right-2 top-3 right-3 flex items-center gap-2">
          <MyButton
            onClick={() => {
              alertActions(() => {
                onSubmit(`/course-contents/${data?.id}`, {}, "DELETE");
              }, "Are you sure to delete!");
            }}
            size="xs"
            classNames={{
              root: "bg-red-500 hover:bg-red-800",
            }}
            leftIcon={<IconTrash size={16} />}
          >
            Delete
          </MyButton>

          <MyButton
            onClick={open}
            size="xs"
            leftIcon={<IconPencilMinus size={16} />}
          >
            Edit
          </MyButton>
        </div>
      </div>

      <Modal
        title={"Edit Course Content"}
        opened={opened}
        onClose={close}
        centered
        size="lg"
      >
        <EditCourseContent close={close} data={data} />
      </Modal>
    </>
  );
};

export default CourseContentCard;
