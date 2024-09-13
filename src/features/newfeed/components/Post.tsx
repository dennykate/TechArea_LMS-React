/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Group,
  Text,
  ActionIcon,
  // HoverCard,
  Menu,
  rem,
  Modal,
  Avatar,
  Popover,
} from "@mantine/core";
import { IconThumbUp, IconMessageCircle } from "@tabler/icons-react";
import PostModal from "./PostModal";
import { useDisclosure } from "@mantine/hooks";
import { Interweave } from "interweave";
import { usePostDataMutation } from "@/redux/api/queryApi";
import { BiDotsHorizontal, BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import { useDispatch } from "react-redux";
import { editPost } from "@/redux/services/postSlice";
import UpdateField from "./UpdateField";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import useMutate from "@/hooks/useMutate";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import PostMedia from "./PostMedia";

interface Reaction {
  id: string;
  emoji: string;
}

const reactions: Reaction[] = [
  { id: "good", emoji: "👍" },
  { id: "best", emoji: "❤️" },
  { id: "not bad", emoji: "🙂" },
  { id: "bad", emoji: "👎" },
];
interface ReactProps {
  user_id: string;
  type: string;
}

export type MediaType = {
  id: string;
  url: string;
  mediable_id: string;
  mediable_type: string;
};

interface ParentProps {
  parent: string;
  data?: {
    image: string;
    created_by: string;
    content: string;
    comment_count: number;
    reaction_count: number;
    created_at: string;
    id: string;
    is_reactor: ReactProps;
    reactions: any;
    creator: any;
    medias: MediaType[];
  };
  resetData: () => void;
  directChangeReaction?: any;
  setPosts?: any;
}

const Post: React.FC<ParentProps> = ({
  parent,
  data,
  resetData,
  directChangeReaction,
  setPosts,
}) => {
  const [opened, setOpened] = useState(false);
  const [commentModalOpen, commentModalControls] = useDisclosure();
  const [editModalOpen, editModalControls] = useDisclosure();
  const [postReaction] = usePostDataMutation();

  const { get } = useEncryptStorage();
  const [onSubmit, { isLoading: reactLoading }] = useMutate({
    navigateBack: false,
    callback: () => {
      // toast.success("Unreact successfully");
      // resetData();
      data && directChangeReaction(data.id, data.is_reactor.type, "remove");
    },
    disableInvalidate: true,
  });

  const userData: {
    id: string;
    profile: null;
    gender: string | null;
    name: string;
    role_id: string;
  } = JSON.parse(get("userInfo") as string);

  const postReactionHandler = async (selectedReaction: Reaction) => {
    try {
      const payload = {
        type: selectedReaction.id,
        post_id: data?.id,
      };
      const response = (await postReaction({
        url: "/reactions",
        method: "POST",
        body: payload,
      })) as any;

      if (response?.data?.status === "success") {
        toast.success("Reaction posted successfully!");
        // Call the directChangeReaction function with the new reaction type
        data && directChangeReaction(data.id, selectedReaction.id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to post reaction.");
    }
  };

  const handleReactionSelect = (r: Reaction) => {
    postReactionHandler(r);
  };

  const [deletePost] = usePostDataMutation();

  const deletePostHandler = async (postId: string) => {
    // Display SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = (await deletePost({
            url: `/posts/${postId}`,
            method: "DELETE",
          })) as any;

          if (response?.data?.status === "success") {
            toast.success(`${response?.data?.message}`);
            // resetData();

            setPosts((posts: any) => {
              return posts?.filter((post: any) => post?.id !== data?.id);
            });
          }
        } catch (error) {
          //
        }
      }
    });
  };

  const deleteReactHandler = async () => {
    if (data?.is_reactor === null) return;

    onSubmit(`/reactions/${data?.id}`, {}, "DELETE");
  };

  const dispatch = useDispatch();
  const handleEditButtonClick = () => {
    if (data) {
      dispatch(editPost(data));
      editModalControls.open();
    }
  };

  const handleCommentButtonClick = () => {
    if (data?.id) {
      commentModalControls.open();
    }
  };

  return (
    <div className="w-full flex justify-center items-center cursor-default ">
      <Card
        shadow={`${parent === "newfeed" ? "md" : ""}`}
        radius="md"
        withBorder={parent === "newfeed"}
        className={twMerge(
          parent === "newfeed" ? "sm:p-[30px] p-[20px]" : "p-0"
        )}
        w={"100%"}
      >
        <Card.Section className="relative">
          {data?.medias && <PostMedia data={data?.medias} parent={parent} />}

          {/* for delete and edit  */}
          {parent === "newfeed" &&
            (userData?.id === data?.creator?.id ||
              userData?.role_id == "3") && (
              <div className=" absolute top-[2px] right-[2px] z-10">
                <Menu width={200} shadow="md">
                  <Menu.Target>
                    <button className="bg-primary text-white text-xl border rounded p-1 hover:bg-primary/70 hover:backdrop-blur-md">
                      <BiDotsHorizontal />
                    </button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        if (data) deletePostHandler(data.id);
                      }}
                      color="red"
                      icon={<BiTrash size={rem(14)} />}
                    >
                      Delete
                    </Menu.Item>

                    <Menu.Item
                      onClick={() => handleEditButtonClick()}
                      icon={<BiEdit size={rem(14)} />}
                    >
                      Edit
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            )}
        </Card.Section>

        {/* post info  */}
        <div className="flex gap-3 flex-col w-full mb-2">
          <div className="flex sm:gap-3 gap-2 items-center sm:my-5 mb-2 mt-3">
            <Avatar
              className=" rounded-full"
              size={"md"}
              src={data?.creator?.profile}
            />
            <div className="flex items-center justify-between w-full">
              <Group
                style={{ justifyContent: "space-between" }}
                mt="md"
                mb="xs"
              >
                <p className=" font-medium md:text-md text-sm">
                  {data?.created_by}
                </p>
              </Group>

              <div className=" text-[11px] md:text-[12px] text-gray-500 sm:block hidden">
                <p>{data?.created_at}</p>
              </div>
            </div>
          </div>

          <Text size="sm" color="dimmed">
            <Interweave content={data?.content} />
          </Text>
        </div>

        {/* <div className=" text-[11px] md:text-[12px] text-gray-500 w-full flex justify-end">
          <p>{data?.created_at}</p>
        </div> */}

        {/* reaction count and comment cout  */}
        <div
          className=" p-2 sm:my-2 mb-2 sm:text-[13px] text-[11px] text-gray-500 flex justify-end 
        sm:gap-5 gap-2"
        >
          <span>{data?.reactions?.best} Best</span>
          <span>{data?.reactions?.good} Good</span>
          <span>{data?.reactions["not bad"]} Not Bad</span>
          <span>{data?.reactions?.bad} Bad</span>

          <span>{data?.comment_count} Comment</span>
        </div>

        <div className="flex w-full justify-around gap-1 ">
          <Popover shadow="md" opened={opened} onChange={setOpened}>
            <Popover.Target>
              <Button
                disabled={reactLoading}
                onClick={() => {
                  if (data?.is_reactor) deleteReactHandler();
                  else setOpened(true);
                }}
                fullWidth
                color={
                  data && data.is_reactor?.user_id === userData.id
                    ? "blue"
                    : "gray"
                }
                variant="outline"
                leftIcon={
                  data?.is_reactor === null ? (
                    <IconThumbUp size={16} />
                  ) : (
                    `${
                      data?.is_reactor?.type === "good"
                        ? "👍"
                        : data?.is_reactor?.type === "best"
                        ? "❤️"
                        : data?.is_reactor?.type === "not bad"
                        ? "🙂"
                        : data?.is_reactor?.type === "bad" && "👎"
                    }`
                  )
                }
                mb={2}
              >
                {data?.is_reactor
                  ? data.is_reactor?.user_id === userData.id
                    ? data?.is_reactor?.type
                    : null
                  : "Like"}
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <div className="flex justify-center gap-2">
                {reactions.map((r) => (
                  <ActionIcon
                    key={r.id}
                    size="xl"
                    onClick={() => {
                      handleReactionSelect(r);
                      setOpened(false);
                    }}
                  >
                    <span>{r.emoji}</span>
                  </ActionIcon>
                ))}
              </div>
            </Popover.Dropdown>
          </Popover>
          {parent === "newfeed" && (
            <Button
              fullWidth
              variant="outline"
              leftIcon={<IconMessageCircle size={16} />}
              onClick={handleCommentButtonClick}
            >
              Comment
            </Button>
          )}
        </div>
      </Card>

      {/* modal for comment and edit */}
      <Modal
        opened={editModalOpen}
        onClose={editModalControls.close}
        size={"lg"}
        centered
        title="Edit Post"
      >
        <UpdateField
          resetData={resetData}
          close={editModalControls.close}
          initialContent={data as any}
          setPosts={setPosts}
        />
      </Modal>

      {data && commentModalOpen && (
        <PostModal
          id={data.id}
          opened={commentModalOpen}
          close={commentModalControls.close}
          directChangeReaction={directChangeReaction}
          setPosts={setPosts}
        />
      )}
    </div>
  );
};

export default Post;
