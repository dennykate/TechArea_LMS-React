import { useSendMessageMutation } from "@/redux/api/chatApi";
import { useMessageHandler } from "@/utilities/messageHandler";
import { Avatar, Badge, Flex, Text } from "@mantine/core";
import { IoIosSend } from "react-icons/io";
interface Info {
  id: string;
  profile: string;
  name: string;
  email: string;
}
interface LayoutProps {
  data: Info;
}
const UserProfile: React.FC<LayoutProps> = ({ data }) => {
  const [sendMessage] = useSendMessageMutation();
  const { messageHandler, inputValue, setInputValue } = useMessageHandler();

  // for press enter key
  const handleKeyDown = (event: {
    key: string;
    shiftKey: unknown;
    preventDefault: () => void;
  }) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  // for send message
  const handleSendMessage = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("message", inputValue);
      formData.append("partner_id", data?.id.toString());

      const payload = {
        url: "/messages",
        method: "POST",
        body: formData,
      };

      await sendMessage(payload);
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  return (
    <div
      className={`flex flex-col border hover:bg-slate-200 transition duration-75 cursor-pointer col-span-1 shadow-sm   bg-white w-full h-[20vh]`}
    >
      {/* top information  */}
      <div className="flex justify-around shadow-sm p-5">
        <Avatar radius={"100%"} size={"lg"} src={`${data?.profile}`} />
        <Flex
          gap="sm"
          justify="flex-start"
          align="flex-start"
          direction={"column"}
        >
          <Flex gap="md" direction={"column"} justify="center" align="center">
            <Text fz={16} fw={600}>
              {data?.name}
            </Text>
            <Badge size="xs" color="blue">
              {data?.email}
            </Badge>
          </Flex>
        </Flex>
      </div>
      {/* start conversation  */}
      <div className="flex items-center justify-center h-full">
        <div className="flex w-[90%] h-[40px] bg-slate-200 rounded-full overflow-hidden mx-5">
          <input
            type="text"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={messageHandler}
            placeholder="Enter your message..."
            className="outline-none p-2 px-5 w-full rounded-full h-full bg-slate-200"
          />
          <div
            onClick={handleSendMessage}
            className="w-48 h-full rounded-full flex justify-center items-center bg-blue-500 hover:bg-blue-400 text-white"
          >
            <IoIosSend size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
