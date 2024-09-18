/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, Modal } from "@mantine/core";
import { IoIosCheckmarkCircle } from "react-icons/io";
import MyButton from "@/components/buttons/MyButton";
import Heading from "@/components/typography/Heading";
import { useDisclosure } from "@mantine/hooks";
import React, { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import LearnCourseContentCard from "./LearnCourseContentCard";

interface PropsType {
  data: any;
  completeIndex: number;
  index: number;
}

const LearnCourseAccordion: React.FC<PropsType> = ({
  data,
  completeIndex,
  index,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const isDisabled = useMemo(
    () => index > completeIndex,
    [index, completeIndex]
  );

  return (
    <>
      <Accordion.Item value={"customization" + Math.random()}>
        <Accordion.Control
          disabled={isDisabled}
          className={twMerge(
            " !bg-primary-100 bg-opacity-80  sm:!px-4 !px-2 ",
            !isDisabled && "hover:!bg-primary-200"
          )}
        >
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p>{data?.name}</p>

              {data?.is_complete && (
                <IoIosCheckmarkCircle size={20} className="text-primary-500" />
              )}
            </div>

            {/* <div className="flex items-center gap-2 capitalize">
              <p>{data?.content_type}</p>
            </div> */}
          </div>
        </Accordion.Control>
        <Accordion.Panel bg="white">
          <div className=" space-y-2 sm:!px-4 !px-2">
            <Heading tag="h6">{data?.name}</Heading>
            <p className="text-sm text-gray-500">
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
            </p>
            <div className="flex justify-between items-end mt-2">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  Completed At - {data?.created_at}
                </p>

                <p className="text-sm text-gray-500">
                  Status - {data?.is_complete ? "Completed" : " Not Complete"}
                </p>
              </div>

              <MyButton variant="outline" size="xs" onClick={open}>
                Learn More
              </MyButton>
            </div>
          </div>
        </Accordion.Panel>
      </Accordion.Item>

      <Modal
        opened={opened}
        fullScreen
        onClose={close}
        classNames={{
          body: "px-0",
        }}
      >
        <LearnCourseContentCard data={data} onClose={close} />
      </Modal>
    </>
  );
};

export default LearnCourseAccordion;
