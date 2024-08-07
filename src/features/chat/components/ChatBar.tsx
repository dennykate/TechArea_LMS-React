/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatMate from "./ChatMate";
import Profile from "./Profile";
import { IoChatbubbles } from "react-icons/io5";
import { Key, useMemo } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Loader, Modal } from "@mantine/core";
import GroupChatMate from "./GroupChatMate";
import AddSingleChat from "./AddSingleChat";
import { useDispatch } from "react-redux";
import { clearGroupUsers } from "@/redux/services/chatSlice";
import { FaUserPlus, FaUserGroup } from "react-icons/fa6";
import { useGetDataQuery } from "@/redux/api/queryApi";
import CreateGroupChat from "./group-chats/CreateGroupChat";
import { Link } from "react-router-dom";
import useUserInfo from "@/hooks/use-user-info";

interface Data {
  partner: { role: string; name: string; profile: string; id: string };
  last_message: string;
  id: string;
  name: string;
  image: string;
  description: string;
}
interface FunProps {
  toggleChatRoom: () => void;
}

const ChatBar: React.FC<FunProps> = ({ toggleChatRoom }) => {
  const userInfo = useUserInfo();
  const { data, error, isLoading } = useGetDataQuery(`conversations`);
  const { data: groupChatData } = useGetDataQuery("group-chats");
  const isMobile = useMediaQuery("(max-width: 600px)");

  const dispatch = useDispatch();
  const [groupModalOpened, { open: openGroupModal, close: closeGroupModal }] =
    useDisclosure();

  const [
    singleModalOpened,
    { open: openSingleModal, close: closeSingleModal },
  ] = useDisclosure();

  const handleCloseGroup = () => {
    dispatch(clearGroupUsers());
    closeGroupModal();
  };

  const handleCloseSingle = () => {
    closeSingleModal();
  };

  const filteredData = useMemo(() => {
    return data?.data?.filter((dt: any) => {
      if (userInfo?.role?.id == "1") return true;

      return dt?.partner?.role == "Student";
    });
  }, [data]);

  if (isLoading)
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Loader color="blue" />
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <div>
      <div className="h-[10vh] flex border rounded justify-between px-2 md:px-5 items-center">
        <Link
          to="/dashboard"
          className="flex text-2xl items-center font-semibold gap-3"
        >
          Chat Room <IoChatbubbles />
        </Link>
        <div className="flex gap-4">
          {userInfo?.role_id != "1" && (
            <FaUserGroup
              onClick={openGroupModal}
              className="text-primary cursor-pointer"
              size={22}
            />
          )}
          <FaUserPlus
            onClick={openSingleModal}
            className="text-primary cursor-pointer"
            size={22}
          />
        </div>
      </div>
      <div
        onClick={toggleChatRoom}
        className=" h-[calc(90vh-50px)] scrollbar-none bg-slate-100 overflow-y-scroll flex flex-col py-2"
      >
        {groupChatData?.data?.map((el: Data, index: Key | null | undefined) => (
          <GroupChatMate
            close={closeGroupModal}
            data={el as any}
            key={index}
            parent={"chat_bar"}
          />
        ))}
        {filteredData.map((el: Data, index: Key | null | undefined) => (
          <ChatMate
            data={el}
            key={index}
            padding="p-5"
            justify="justify-start"
            gap="gap-3"
          />
        ))}
      </div>
      <div className="h-[50px] flex">
        <Profile gap="gap-3" />
      </div>

      <Modal
        centered
        size={"xl"}
        opened={groupModalOpened}
        onClose={handleCloseGroup}
        title="Create New Group"
      >
        <CreateGroupChat onClose={handleCloseGroup} />
      </Modal>

      <Modal
        centered
        fullScreen={isMobile}
        size={"xl"}
        opened={singleModalOpened}
        onClose={handleCloseSingle}
      >
        <AddSingleChat close={closeSingleModal} />
      </Modal>
    </div>
  );
};

export default ChatBar;
