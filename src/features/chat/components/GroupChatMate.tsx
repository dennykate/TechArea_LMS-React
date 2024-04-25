import React from "react";
import { Avatar, Badge, Button, Flex, Modal, Text } from "@mantine/core";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentChatData,
  selectCurrentChatData,
} from "@/redux/services/chatSlice";
import { useDisclosure } from "@mantine/hooks";
import { usePostDataMutation } from "@/redux/api/formApi";
import toast from "react-hot-toast";

interface Info {
  name: string;
  image: string;
  last_message: string;
  description: string;
  id: string;
}

interface LayoutProps {
  data: Info;
  parent: string;
  close: () => void;
  setSelectGroup?: (select: { show: boolean; groupId: string | null }) => void;
}

const GroupChatMate: React.FC<LayoutProps> = ({
  parent,
  data,
  setSelectGroup,
}) => {
  const dispatch = useDispatch();

  const showMsgHandler = () => {
    dispatch(setCurrentChatData(data));
    
    Cookies.set("last_conversation", data.id);
    Cookies.set("chat_type", "group-chat");
    Cookies.set("user_id", data.id);
    Cookies.set("profile", data.image);
  };

  const isActive = Cookies.get("last_conversation");
  const userData = useSelector(selectCurrentChatData);

  const handleClick = () => {
    if (parent === "chat_bar") {
      showMsgHandler();
    } else if (setSelectGroup) {
      setSelectGroup({ show: false, groupId: data.id });
    }
  };

  // for delete group
  const [opened, { open, close }] = useDisclosure();
  const [deleteMsg, { isLoading }] = usePostDataMutation();

  const deleteGroupHandler = async () => {
    try {
      const response = await deleteMsg({
        url: `group-chats/${data.id}`,
        method: "DELETE",
      }).unwrap();
      console.log(response);
      if (response.status === "success") {
        toast.success("Group deleted successfully!");
        close();
      } else {
        close();
        toast.error(`Your group was deleted!`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      onDoubleClick={open}
      onClick={handleClick}
      className={`border hover:bg-slate-200 ${
        (parent === "chat_bar" && isActive === data.id) ||
        userData?.id === data.id
          ? "bg-gray-200"
          : "bg-white"
      } transition duration-75 cursor-pointer gap-5 col-span-1 p-3 shadow-sm flex  items-center w-full h-[15vh]`}
    >
      <Avatar radius={"100%"} size={"lg"} src={`${data?.image}`} />
      <Flex
        gap={5}
        justify="flex-start"
        align="flex-start"
        direction={"column"}
      >
        <div className="flex flex-col">
          <Flex gap="sm" justify="flex-start" align="flex-start">
            <Text fz={15} fw={600}>
              {data?.name}
            </Text>
            <Badge size="xs" color="green">
              group
            </Badge>
          </Flex>
          <Text c="dimmed" className=" md:line-clamp-2 line-clamp-1" fz={14}>
            {data?.description}
          </Text>
        </div>
        <Text c="dimmed" fz={14}>
          {data?.last_message || "There's no message."}
        </Text>
      </Flex>
      <Modal title="Delete Message" onClose={close} opened={opened}>
        <div className="flex flex-col text-lg justify-center w-full items-center gap-5">
          <p>Are you sure you want to delete this message?</p>
          <Button
            onClick={deleteGroupHandler}
            fullWidth
            variant="outline"
            color="red"
            loading={isLoading}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default GroupChatMate;
