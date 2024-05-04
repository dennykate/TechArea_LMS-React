/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, Loader, Modal } from "@mantine/core";
import Post from "./Post";
import Comments from "./Comments";
import { useMessageHandler } from "@/utilities/messageHandler";
import { IoIosSend } from "react-icons/io";
import { Key } from "react";
import toast from "react-hot-toast";
import { useGetDataQuery, usePostDataMutation } from "@/redux/api/queryApi";

// interface CommentProps {
//   content: string;
//   created_at: string;
//   created_at_time: string;
//   id: Key | null | undefined;
//   is_owner: boolean;
//   user_name: string;
//   user_profile: string;
// }
// interface DataProps {
//   data:
//     | {
//         image: string;
//         created_by: string;
//         content: string;
//         comment_count: number;
//         reaction_count: number;
//         created_at: string;
//         id: string;
//         comments: CommentProps[] | null;
//       }
//     | undefined;
// }

interface ModalProps {
  close: () => void;
  opened: boolean;
  id: string;
  directChangeReaction?: any;
  setPosts?: any;
}

const PostModal: React.FC<ModalProps> = ({
  opened,
  close,
  id,
  directChangeReaction,
  setPosts,
}) => {
  const { messageHandler, inputValue, setInputValue } = useMessageHandler();
  const [comment, { isLoading }] = usePostDataMutation();

  // for single fetch
  const { data: fetchedData, isFetching } = useGetDataQuery(`/posts/${id}`, {
    skip: !id,
  });

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

        setPosts((posts: any) => {
          return posts?.map((post: any) => {
            if (post.id == id) {
              return { ...post, comment_count: post.comment_count + 1 };
            }

            return post;
          });
        });
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
      // size={"md:55% 100%"}
      size={"lg"}
      radius={0}
      centered
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      {isFetching ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader size="md" />
        </div>
      ) : (
        <>
          <Post
            resetData={() => {}}
            data={fetchedData?.data as any}
            parent="comment"
            directChangeReaction={directChangeReaction}
            setPosts={setPosts}
          />
          {/* comments  */}
          <div className="flex flex-col gap-3 mb-3 mt-[2px]">
            {fetchedData?.data?.comments?.map(
              (el: { id: Key | null | undefined }) => (
                <Comments
                  key={el?.id}
                  data={el as any}
                  setPosts={setPosts}
                  postId={id}
                />
              )
            )}
          </div>

          <Input
            onKeyDown={handleKeyDown}
            size="lg"
            placeholder="Enter your comment..."
            w={"100%"}
            rightSection={
              <button onClick={commentHandler}>
                <IoIosSend size={20} color="blue" />
              </button>
            }
            pointer
            mt="md"
            onChange={messageHandler}
            value={inputValue}
            disabled={isLoading}
            classNames={{
              input: "text-sm",
            }}
          />
        </>
      )}
    </Modal>
  );
};

export default PostModal;
