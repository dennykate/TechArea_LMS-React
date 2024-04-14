/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import Heading from "@/components/typography/Heading";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBookUpload, IconTrashFilled } from "@tabler/icons-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CreateMemory from "./CreateMemory";
import React from "react";
import useMutate from "@/hooks/useMutate";
import alertActions from "@/utilities/alertActions";

interface PropsType {
  data: any;
}

const EventMemory: React.FC<PropsType> = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [onSubmit] = useMutate({ navigateBack: false });

  return (
    <>
      <div className="mt-4 w-full">
        <div className="w-full flex justify-between items-center">
          <Heading tag="h2">Event Memories</Heading>

          <MyButton onClick={open} leftIcon={<IconBookUpload size={16} />}>
            Create New
          </MyButton>
        </div>

        <div className="mt-4">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          >
            <Masonry gutter="10px">
              {data?.map((dt: any) => (
                <div className="relative w-full" key={dt?.id}>
                  <img
                    src={dt?.image}
                    alt={dt?.created_at}
                    className="w-full object-cover"
                  />

                  <button
                    onClick={() =>
                      alertActions(
                        () =>
                          onSubmit(`/event-galleries/${dt?.id}`, {}, "DELETE"),
                        "Are you sure to delete ?"
                      )
                    }
                    className="absolute bottom-2 right-2 bg-red-500 p-2 rounded-md hover:bg-red-700"
                  >
                    <IconTrashFilled color="white" size={18} />

                    <p className="sr-only">Delete Button</p>
                  </button>
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="Create New Memories">
        <CreateMemory onClose={close} />
      </Modal>
    </>
  );
};

export default EventMemory;
