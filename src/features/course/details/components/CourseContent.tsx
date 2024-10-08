/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import Heading from "@/components/typography/Heading";
import { IconBookUpload } from "@tabler/icons-react";
import CourseContentCard from "./CourseContentCard";
// import MyPagination from "@/components/common/MyPagination";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import CreateCourseContent from "./CreateCourseContent";
import React from "react";

interface PropsType {
  data: any;
}

const CourseContent: React.FC<PropsType> = ({ data }) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Heading tag="h2">Lesson Contents</Heading>

        <MyButton onClick={open} leftIcon={<IconBookUpload size={16} />}>
          Create New
        </MyButton>
      </div>

      <div className="grid grid-cols-1 mt-4 gap-4">
        {data?.length > 0 ? (
          data?.map((dt: any) => <CourseContentCard key={dt?.id} data={dt} />)
        ) : (
          <div className="h-[100px] flex justify-center items-center">
            <p className="">No lesson content.</p>
          </div>
        )}
      </div>

      {/* <div className="mt-6 flex justify-end">
        <MyPagination total={5} />
      </div> */}

      <Modal
        opened={opened}
        onClose={close}
        title="Create Lesson Content"
        centered
        size="lg"
      >
        <CreateCourseContent close={close} />
      </Modal>
    </>
  );
};

export default CourseContent;
