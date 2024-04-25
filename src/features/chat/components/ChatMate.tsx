import {
  selectCurrentChatData,
  setCurrentChatData,
} from "@/redux/services/chatSlice";
import { Avatar, Badge, Flex, Text } from "@mantine/core";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
interface Info {
  partner: { role: string; name: string; profile: string; id: string };
  last_message: string;
  id: string;
}
interface LayoutProps {
  justify: string;
  gap: string;
  padding: string;
  data: Info;
}
const ChatMate: React.FC<LayoutProps> = ({ justify, data }) => {
  const dispatch = useDispatch();

  const showMsgHandler = () => {
    dispatch(setCurrentChatData({ ...data, chatType: "single-chat" }));

    Cookies.set("chat_type", "single-chat");
    Cookies.set("last_conversation", data.id);
    Cookies.set("user_id", data.partner.id);
    Cookies.set("user_role", data.partner.role );
  };

  const isActive = Cookies.get("last_conversation");

  // console.log(isActive);
  // console.log(data.id);
  const userData = useSelector(selectCurrentChatData);

  return (
    <div
      onClick={showMsgHandler}
      className={`border ${
        isActive === data.id || userData?.id === data.id
          ? "bg-gray-300"
          : "bg-white"
      } hover:bg-slate-200 transition duration-75 cursor-pointer gap-5 shadow-sm flex ${justify} items-center p-3 bg-white w-full h-[15vh]`}
    >
      <Avatar radius={"100%"} size={"lg"} src={`${data?.partner?.profile}`} />
      <Flex
        gap={5}
        justify="flex-start"
        align="flex-start"
        direction={"column"}
      >
        <Flex gap="md" justify="center" align="center">
          <Text fz={16} fw={600}>
            {data?.partner?.name}
          </Text>
          <Badge size="xs" color="blue">
            {data?.partner?.role}
          </Badge>
        </Flex>

        <Text c="dimmed" className=" line-clamp-1" fz={14}>
          {data?.last_message}
        </Text>
      </Flex>
    </div>
  );
};

export default ChatMate;
