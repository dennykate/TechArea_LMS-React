import { setCurrentChatData } from "@/redux/services/chatSlice";
import { Avatar, Badge, Flex, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
interface Info {
  partner: { role: string; name: string; profile: string };
  last_message: string;
}
interface LayoutProps {
  justify: string;
  gap: string;
  padding: string;
  data: Info;
}
const ChatMate: React.FC<LayoutProps> = ({ justify, gap, padding, data }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(setCurrentChatData(data))}
      className={`border hover:bg-slate-200 transition duration-75 cursor-pointer ${gap}  shadow-sm flex ${justify} items-center ${padding} bg-white w-full h-[10vh]`}
    >
      <Avatar radius={"100%"} size={"lg"} src={`${data?.partner?.profile}`} />
      <Flex
        gap="sm"
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

        <Text c="dimmed" fz={14}>
          {data?.last_message}
        </Text>
      </Flex>
    </div>
  );
};

export default ChatMate;
