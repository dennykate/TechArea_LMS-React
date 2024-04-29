/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  ActionIcon,
  Avatar,
  Badge,
  Flex,
  Menu,
  Modal,
  Text,
} from "@mantine/core";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentChatData,
  selectCurrentChatData,
} from "@/redux/services/chatSlice";
import { useDisclosure } from "@mantine/hooks";
import useMutate from "@/hooks/useMutate";
import {
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconUsers,
} from "@tabler/icons-react";
import alertActions from "@/utilities/alertActions";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import EditGroupChat from "./group-chats/EditGroupChat";
import GroupChatUserManagement from "./group-chats/GroupChatUserManagement";

interface Info {
  created_by: any;
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
  const { get } = useEncryptStorage();

  const userInfo = JSON.parse(get("userInfo") as any);

  const showMsgHandler = () => {
    dispatch(setCurrentChatData({ ...data, chatType: "group-chat" }));

    Cookies.set("last_conversation", data.id);
    Cookies.set("chat_type", "group-chat");
    Cookies.set("user_id", data.id);
    Cookies.set("user_role", "");
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
  const [editOpened, { open: editOpen, close: editClose }] = useDisclosure();
  const [managementOpened, { open: managementOpen, close: managementClose }] =
    useDisclosure();
  const [onDelete] = useMutate({ navigateBack: false });

  return (
    <>
      <div
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
          className="w-full"
        >
          <div className="flex flex-col w-full">
            <Flex gap="sm" justify="space-between" align="center">
              <div className="flex items-center gap-4">
                <Text fz={15} fw={600}>
                  {data?.name}
                </Text>
                <Badge size="xs" color="green">
                  group
                </Badge>
              </div>

              {userInfo?.id === data?.created_by && (
                <Menu
                  opened={opened}
                  onClose={close}
                  shadow="md"
                  width={200}
                  position="bottom-end"
                >
                  <Menu.Target>
                    <ActionIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        open();
                      }}
                      className="hover:bg-transparent opacity-50 hover:opacity-100"
                    >
                      <IconDotsVertical size={20} color="black" />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={(e) => {
                        e.stopPropagation();

                        managementOpen();
                      }}
                      icon={<IconUsers size={14} />}
                    >
                      Manage Users
                    </Menu.Item>
                    <Menu.Item
                      onClick={(e) => {
                        e.stopPropagation();

                        editOpen();
                      }}
                      icon={<IconPencil size={14} />}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={(e) => {
                        e.stopPropagation();

                        alertActions(() => {
                          onDelete(`/group-chats/${data.id}`, {}, "DELETE");
                        }, "Are you sure to delete this chat");
                      }}
                      color="red"
                      icon={<IconTrash size={14} />}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </Flex>
            <Text
              c="dimmed"
              className=" md:line-clamp-2 line-clamp-1 opacity-90"
              fz={12}
            >
              {data?.description}
            </Text>
          </div>
          <Text c="dimmed" fz={14}>
            {data?.last_message || "There's no message."}
          </Text>
        </Flex>
      </div>

      <Modal
        opened={editOpened}
        onClose={editClose}
        centered
        size={"xl"}
        title="Create New Group"
      >
        <EditGroupChat id={data?.id} onClose={editClose} />
      </Modal>

      <Modal
        opened={managementOpened}
        onClose={managementClose}
        centered
        size={"lg"}
      >
        <GroupChatUserManagement
          groupChatId={data?.id}
          onClose={managementClose}
        />
      </Modal>
    </>
  );
};

export default GroupChatMate;
