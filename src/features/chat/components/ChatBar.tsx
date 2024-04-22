import ChatMate from "./ChatMate";
import Profile from "./Profile";
import { IoChatbubbles } from "react-icons/io5";
import { useGetDataQuery } from "@/redux/api/queryApi";
import { Key } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { Loader, Modal } from "@mantine/core";
import AddChatMate from "./AddChatMate";
import GroupChatMate from "./GroupChatMate";
import { useDispatch } from "react-redux";
import { clearGroupUsers } from "@/redux/services/chatSlice";

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
  // for group conversation
  const {
    data: groupChatData,
  } = useGetDataQuery("group-chats");

  // console.log(groupChatData);

  // for single conversation
  const { data, error, isLoading } = useGetDataQuery(`conversations`);

  // console.log(data);
  const dispatch = useDispatch();
  const [opened, { open, close }] = useDisclosure();
  const handleClose = () => {
    dispatch(clearGroupUsers());
    close();
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
        <FaSquarePlus
          onClick={open}
          className=" text-primary cursor-pointer"
          size={30}
        />
      </div>
      <div
        onClick={toggleChatRoom}
        className=" h-[calc(90vh-50px)] scrollbar-none bg-slate-100 overflow-y-scroll flex flex-col py-2"
      >
        {/* for group chatting  */}
        {groupChatData?.data?.map((el: Data, index: Key | null | undefined) => (
          <GroupChatMate
            close={close}
            data={el}
            key={index}
            parent={"chat_bar"}
          />
        ))}
        {/* for single chatting  */}
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
      <Modal centered size={"100%"} opened={opened} onClose={handleClose}>
        <AddChatMate close={close} />
      </Modal>
    </div>
  );
};

export default ChatBar;
