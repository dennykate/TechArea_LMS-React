import { Modal } from "@mantine/core";
import Post from "./Post";
import Comments from "./Comments";

interface ModalProps {
  close: () => void;
  opened: boolean;
}
const PostModal: React.FC<ModalProps> = ({ opened, close }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="This is a fullscreen modal"
      size={"55%"}
      radius={0}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Post parent='comment'/>
      <Comments/>
    </Modal>
  );
};

export default PostModal;
