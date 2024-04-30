/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Modal } from "@mantine/core";
import Post from "./Post";
import Comments from "./Comments";
import { useMessageHandler } from "@/utilities/messageHandler";
import { IoIosSend } from "react-icons/io";
import { Key } from "react";
import toast from "react-hot-toast";
import { usePostDataMutation } from "@/redux/api/queryApi";

interface CommentProps {
  content: string;
  created_at: string;
  created_at_time: string;
  id: Key | null | undefined;
  is_owner: boolean;
  user_name: string;
  user_profile: string;
}
interface DataProps {
  data:
    | {
        image: string;
        created_by: string;
        content: string;
        comment_count: number;
        reaction_count: number;
        created_at: string;
        id: string;
        comments: CommentProps[] | null;
      }
    | undefined;
}

interface ModalProps {
  close: () => void;
  opened: boolean;
  fetchedData: DataProps;
}

const PostModal: React.FC<ModalProps> = ({ opened, close, fetchedData }) => {
  const { messageHandler, inputValue, setInputValue } = useMessageHandler();
  const [comment, { isLoading }] = usePostDataMutation();

  const commentHandler = async () => {
    try {
      const payload = {
        content: inputValue,
        post_id: fetchedData?.data?.id,
      };
      const response = (await comment({
        url: "/comments",
        method: "POST",
        body: payload,
      })) as any;
      // console.log(response);
      if (response?.data?.status === "success") {
        setInputValue("");
        toast.success("Comment successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !isLoading) {
      commentHandler();
    }
  };

  // console.log(fetchedData);
  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"md:55% 100%"}
      radius={0}
      centered
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Post
        resetData={() => {}}
        data={fetchedData?.data as any}
        parent="comment"
      />
      {/* comments  */}
      <div className="flex flex-col gap-3 my-3">
        {fetchedData?.data?.comments?.map(
          (el: { id: Key | null | undefined }) => (
            <Comments key={el?.id} data={el as any} />
          )
        )}
      </div>

      <Input
        onKeyDown={handleKeyDown}
        size="lg"
        placeholder="Enter your comment..."
        w={"100%"}
        rightSection={<IoIosSend size={20} color="blue" />}
        pointer
        mt="md"
        onChange={messageHandler}
        value={inputValue}
        disabled={isLoading}
      />
    </Modal>
  );
};

export default PostModal;
