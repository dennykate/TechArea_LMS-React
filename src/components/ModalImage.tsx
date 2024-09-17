import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

interface PropsType {
  imageURL: string;
  children: React.ReactNode;
}

const ModalImage: React.FC<PropsType> = ({ imageURL, children }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="" onClick={() => open()}>
        {children}
      </div>

      <Modal fullScreen opened={opened} onClose={close} centered>
        <div className="w-full h-[calc(100vh-120px)] flex justify-center items-center">
          <img
            src={imageURL}
            alt="imageURL"
            className="sm:h-[80vh] w-auto object-cover"
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalImage;
