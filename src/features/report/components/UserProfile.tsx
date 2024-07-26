import { usePostDataMutation } from "@/redux/api/queryApi";
import {
  addGroupUser,
  removeGroupUser,
  setCurrentChatData,
} from "@/redux/services/chatSlice";
import { useMessageHandler } from "@/utilities/messageHandler";
import { Avatar, Badge, Checkbox, Flex, Text } from "@mantine/core";
import Cookies from "js-cookie";
import { IoIosSend } from "react-icons/io";
import { useDispatch } from "react-redux";
interface Info {
  id: string;
  profile: string;
  name: string;
  email: string;
  role: string;
}
interface LayoutProps {
  data: Info;
  parent: string;
  close: () => void;
}
const UserProfile: React.FC<LayoutProps> = ({ parent, data, close }) => {
  // collect user id for adding group
  const dispatch = useDispatch();
  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      dispatch(addGroupUser({ user_id: data?.id }));
    } else {
      dispatch(removeGroupUser(data.id));
    }
  };

  const [sendMessage, { isLoading }] = usePostDataMutation();

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
      dispatch(
        setCurrentChatData({
          ...data,
          chatType: "single-chat",
          partner: {
            id: data.id,
            role: data.role,
          },
        })
      );
      Cookies.set("chat_type", "single-chat");
      Cookies.set("last_conversation", data.id);
      Cookies.set("user_id", data.id);
      Cookies.set("user_role", data.role);
      close();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div
      className={`flex relative flex-col border hover:bg-slate-100 transition duration-75 
      cursor-pointer col-span-1 shadow-sm bg-white w-full min-h-[20vh]  pb-5`}
    >
      {/* top information  */}
      <div className="flex justify-between shadow-sm p-5">
        <div className="flex gap-2">
          <Avatar radius={"100%"} size={"lg"} src={`${data?.profile}`} />
          <Flex gap="xs" direction={"column"} justify="center">
            <Text fz={16} fw={600}>
              {data?.name}
            </Text>
            <div className="flex items-center gap-2">
              <Badge size="xs" color="blue">
                {data?.role}
              </Badge>
              <Badge size="xs" color="blue">
                {data?.email}
              </Badge>
            </div>
          </Flex>
        </div>
        {/* for adding group  */}
        {parent !== "single_chat" && (
          <div className="bottom-2 right-2">
            <Checkbox
              onChange={(event) =>
                handleCheckboxChange(event.currentTarget.checked)
              }
              label={`${
                parent === "add_user" ? "Add to group" : "Remove user"
              }`}
              color={`${parent !== "add_user" && "red"}`}
              mt="md"
            />
          </div>
        )}
      </div>
      {/* start conversation  */}
      <div className="flex items-center justify-center h-full">
        <div className="flex w-[90%] h-[40px] bg-slate-200 rounded-full overflow-hidden mx-5">
          <input
            disabled={isLoading}
            type="text"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={messageHandler}
            placeholder="Enter your message..."
            className="outline-none p-2 px-5 w-full rounded-full h-full bg-slate-200"
          />
          <button
            disabled={isLoading}
            onClick={handleSendMessage}
            className="w-48 h-full rounded-full flex justify-center items-center bg-blue-500 hover:bg-blue-400 text-white"
          >
            <IoIosSend size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
