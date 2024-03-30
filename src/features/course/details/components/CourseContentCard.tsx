import MyButton from "@/components/buttons/MyButton";
import Heading from "@/components/typography/Heading";
import { Badge, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendarMonth,
  IconUser,
  IconPencilMinus,
} from "@tabler/icons-react";
import EditCourseContent from "./EditCourseContent";

const CourseContentCard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div
        className="w-full border rounded-sm border-black border-opacity-20 p-2 shadow-md
     flex items-start lg:gap-4 gap-2 relative  lg:flex-row flex-col"
      >
        <div className="lg:w-[300px] w-full h-[200px] rounded-sm overflow-hidden ">
          <img
            src="https://i.postimg.cc/rmQCLwT8/1600w-w-K95f3-XNRa-M.webp"
            alt="thumbnail"
            className="
         w-full h-full object-cover"
          />
        </div>

        <div className=" space-y-3 w-full lg:w-[calc(100%-300px)] py-2">
          <div className="w-[calc(100%-80px)]">
            <Heading tag="h6">Step 1. How to be a grammar</Heading>
          </div>
          <p className="text-sm font-[300] text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            sequi alias cumque magni sit quaerat id repellat, adipisci eius
            perspiciatis, ab nisi minus voluptatem optio eveniet. Nihil
            cupiditate fuga dolorum!
          </p>
          <div className="flex flex-col gap-3 items-start !mt-4">
            <Badge size="md" color="red" leftSection={<IconUser size={16} />}>
              Thwe Thwe
            </Badge>
            <Badge
              size="md"
              color="teal"
              leftSection={<IconCalendarMonth size={16} />}
            >
              01 Dec 2000 12:00 AM
            </Badge>
          </div>
        </div>

        <div className="absolute top-2 right-2">
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
        <EditCourseContent close={close} />
      </Modal>
    </>
  );
};

export default CourseContentCard;
