import { Accordion, Modal } from "@mantine/core";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";

import MyButton from "@/components/buttons/MyButton";
import Heading from "@/components/typography/Heading";
import { useDisclosure } from "@mantine/hooks";
import LearnCourseContentCard from "./LearnCourseContentCard";

const LearnCourseAccordion = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Accordion.Item value="customization">
        <Accordion.Control
          className=" bg-primary-100 hover:bg-primary-100 hover:bg-opacity-50
       bg-opacity-50 sm:!px-4 !px-2"
        >
          <div className="flex items-center gap-2">
            <p>How to be a programmer ?</p>

            <IoIosCheckmarkCircle size={20} className="text-primary-500" />
          </div>
        </Accordion.Control>
        <Accordion.Panel bg="white">
          <div className=" space-y-2 sm:!px-4 !px-2">
            <Heading tag="h6">How to be a programmer ?</Heading>
            <p className="text-xs sm:text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              sint quasi dolore voluptatem perferendis hic debitis sapiente
              mollitia autem obcaecati corporis, placeat possimus quisquam
              laboriosam totam aliquid deserunt laborum reiciendis.
            </p>
            <div className="flex justify-between items-end mt-2">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-gray-500">
                  Created by -{" "}
                  <Link to={""} className="underline text-gray-800">
                    Ma Ma Thwe
                  </Link>
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  Completed At - 01 Dec 2000
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  Status - Not Complete
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
        <LearnCourseContentCard />
      </Modal>
    </>
  );
};

export default LearnCourseAccordion;
