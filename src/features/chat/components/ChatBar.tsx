import ChatMate from "./ChatMate";
import Profile from "./Profile";
import { IoChatbubbles } from "react-icons/io5";
import { Key } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Loader, Modal } from "@mantine/core";
import AddChatMate from "./AddChatMate";
import GroupChatMate from "./GroupChatMate";
import AddSingleChat from "./AddSingleChat";
import { useDispatch } from "react-redux";
import { clearGroupUsers } from "@/redux/services/chatSlice";
import { FaUserPlus } from "react-icons/fa6";
import { useGetDataQuery } from "@/redux/api/queryApi";

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
        <p className="flex text-2xl items-center font-semibold gap-3">
          Chat Room <IoChatbubbles />
        </p>
        <div className="flex gap-3">
          <FaSquarePlus
            onClick={openGroupModal}
            className="text-primary cursor-pointer"
            size={30}
          />
          <FaUserPlus
            onClick={openSingleModal}
            className="text-primary cursor-pointer"
            size={30}
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
            data={el}
            key={index}
            parent={"chat_bar"}
          />
        ))}
        {data?.data?.map((el: Data, index: Key | null | undefined) => (
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
        size={"100%"}
        opened={groupModalOpened}
        onClose={handleCloseGroup}
      >
        <AddChatMate close={closeGroupModal} />
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
