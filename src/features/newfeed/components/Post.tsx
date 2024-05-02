/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Group,
  Image,
  Text,
  ActionIcon,
  HoverCard,
  Menu,
  rem,
  Modal,
  Avatar,
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
  const [commentModalOpen, commentModalControls] = useDisclosure();
  const [editModalOpen, editModalControls] = useDisclosure();
  const [postReaction] = usePostDataMutation();

  const { get } = useEncryptStorage();
  const [onSubmit, { isLoading: reactLoading }] = useMutate({
    navigateBack: false,
    callback: () => {
      toast.success("Unreact successfully");
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
  } = JSON.parse(get("userInfo") as string);
  // console.log(data);

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
      console.log(response);
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

  // console.log(data);
  const [deletePost] = usePostDataMutation();

  const deletePostHandler = async (postId: string) => {
    try {
      const response = (await deletePost({
        url: `/posts/${postId}`,
        method: "DELETE",
      })) as any;
      console.log(response);
      if (response?.data?.status === "success") {
        toast.success(`${response?.data?.message}`);
        resetData();
      }
    } catch (error) {
      console.log(error);
    }
  };


  const [deleteReact, { isLoading: reactLoading, error }] =
    usePostDataMutation();
  const deleteReactHandler = async () => {
    const response = (await deleteReact({
      url: `/reactions/${data?.id}`,
      method: "DELETE",
    })) as any;
    console.log(response, error);
    if (response?.data?.status === "success") {
      toast.success("Unreact successfully");
      resetData();
    }
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
        padding={parent === "newfeed" ? 30 : 0}
        w={"100%"}
      >
        <Card.Section className="relative">
          {data?.image && (
            <div className="w-full flex justify-center">
              <img
                src={`${data?.image}`}
                alt=""
                className={` object-cover h-[300px] md:h-[500px]  ${
                  parent === "newfeed" ? "w-[700px]" : "w-[500px]"
                }`}
              />
            </div>
          )}

          {/* for delete and edit  */}
          {parent === "newfeed" && userData?.name === data?.created_by && (
            <div className=" absolute top-3 right-3 z-10">
              <Menu width={200} shadow="md">
                <Menu.Target>
                  <button className="bg-primary text-white text-xl border rounded p-1 hover:bg-primary/70 hover:backdrop-blur-md">
                    <BiDotsHorizontal />
                  </button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => deletePostHandler(data.id)}
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
        <div className="flex gap-3 flex-col ">
          <div className="flex gap-3 items-center my-5">
            <Avatar
              className=" rounded-full"
              size={"lg"}
              src={userData?.profile}
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

              <div className=" text-[11px] md:text-[12px] text-gray-500">
                <p>{data?.created_at}</p>
              </div>
            </div>
          </div>

          <Text size="sm" color="dimmed">
            <Interweave content={data?.content} />
          </Text>
        </div>

        {/* reaction count and comment cout  */}
        <div className=" p-2 my-2 text-[13px] text-gray-500 flex justify-end gap-5">
          <span>{data?.reactions?.good} Good</span>
          <span>{data?.reactions?.best} Best</span>
          <span>{data?.reactions["not bad"]} Not Bad</span>
          <span>{data?.reactions?.bad} Bad</span>

          <span>{data?.comment_count} Comment</span>
        </div>

        {/* for comment and reaction  */}
        <div className="flex w-full justify-around gap-1">
          <HoverCard shadow="md" openDelay={50}>
            <HoverCard.Target>
              <Button
                disabled={reactLoading}
                onClick={deleteReactHandler}
                fullWidth
                color={
                  data.is_reactor?.user_id === userData.id ? "blue" : "gray"
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
              >
                {data?.is_reactor
                  ? data.is_reactor?.user_id === userData.id
                    ? data?.is_reactor?.type
                    : null
                  : "Like"}
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <div className="flex justify-center gap-2">
                {reactions.map((r) => (
                  <ActionIcon
                    key={r.id}
                    size="xl"
                    onClick={() => handleReactionSelect(r)}
                  >
                    <span>{r.emoji}</span>
                  </ActionIcon>
                ))}
              </div>
            </HoverCard.Dropdown>
          </HoverCard>
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
