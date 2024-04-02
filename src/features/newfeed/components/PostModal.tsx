import { Input, Modal } from "@mantine/core";
import Post from "./Post";
import Comments from "./Comments";
import { useMessageHandler } from "@/utilities/messageHandler";
import { IoIosSend } from "react-icons/io";

interface ModalProps {
  close: () => void;
  opened: boolean;
}
const PostModal: React.FC<ModalProps> = ({ opened, close }) => {
  const [messageHandler, inputValue] = useMessageHandler();
  console.log(inputValue);
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Post of someone...`}
      size={"55%"}
      radius={0}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Post parent="comment" />
      <Comments />
      <Input
        size="lg"
        placeholder="Enter your comment..."
        w={"100%"}
        rightSection={<IoIosSend size={20} color="blue" />}
        pointer
        mt="md"
        onChange={messageHandler}
      />
    </Modal>
  );
};

export default PostModal;
