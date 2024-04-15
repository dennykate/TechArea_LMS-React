import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaFilePdf } from "react-icons/fa";
import MyButton from "../buttons/MyButton";

interface PropsType {
  name?: string;
  url: string;
}

const PDFViewer: React.FC<PropsType> = ({ name = "PDF File", url }) => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <button
        onClick={open}
        className="w-full p-2 border border-opacity-10 rounded flex gap-2"
      >
        <FaFilePdf size={16} />
        <p className="text-sm">{name}</p>
      </button>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        fullScreen
        classNames={{
          body: "!p-0",
        }}
      >
        <MyButton onClick={close} className="absolute bottom-4 right-8">
          Close
        </MyButton>
        <iframe src={url} style={{ width: "100%", height: "100vh" }}>
          Your browser does not support iframes.
        </iframe>
      </Modal>
    </>
  );
};

export default PDFViewer;
