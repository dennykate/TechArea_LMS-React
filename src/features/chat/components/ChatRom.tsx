import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
// import ChatMate from "./ChatMate";
import { useMessageHandler } from "@/utilities/messageHandler";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { MdAttachFile } from "react-icons/md";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FileSend from "./FileSend";
import { useSelector } from "react-redux";
import { selectCurrentChatData } from "@/redux/services/chatSlice";
import { useSendMessageMutation } from "@/redux/api/chatApi";
import Message from "./Message";
import { useGetDataQuery } from "@/redux/api/queryApi";
import Cookies from "js-cookie";

interface MsgData {
  is_sender: boolean;
  message: string;
}

interface ApiError {
  status: number;
  message: string;
}

const ChatRoom: React.FC = () => {
  const { messageHandler, inputValue, appendEmoji, setInputValue } =
    useMessageHandler();
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  const [sendMessage, { isLoading: getMsgLoading }] = useSendMessageMutation();

  const [opened, { open, close }] = useDisclosure();

  // console.log(sendMsgError);
  // for user data
  const userData = useSelector(selectCurrentChatData);
  // console.log(userData);

  // for get message
  const userId: string | undefined = Cookies.get("user_id");
  const lastConversation: string | undefined = Cookies.get("last_conversation");

  const {
    data: chatData,
    error,
    isLoading,
  } = useGetDataQuery(
    userData === null
      ? `/messages?conversation_id=${lastConversation}` ||
          `/group-chat-messages?group_chat_id=${lastConversation}`
      : userData?.partner
      ? `/messages?conversation_id=${lastConversation}`
      : `/group-chat-messages?group_chat_id=${lastConversation}`
  );

  // console.log(userData);
  // console.log(chatData);

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

  // console.log(inputValue);

  // console.log(userData?.partner?.id);

  // console.log(userId)
  // console.log(lastConversation)
  // for send message
  const handleSendMessage = async () => {
    if (!userId || !lastConversation) {
      console.error("User ID or last conversation ID is undefined.");
      return;
    }

    try {
      const formData = new URLSearchParams();

      if (userData?.partner) {
        formData.append("partner_id", userId);
      } else {
        formData.append("group_chat_id", lastConversation);
      }

      formData.append("message", inputValue);

      const payload = {
        url: `${userData?.partner ? "/messages" : "/group-chat-messages"}`,
        method: "POST",
        body: formData,
      };

      await sendMessage(payload);
      setInputValue("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    appendEmoji(emojiObject.emoji);
  };

  if (isLoading) {
    return (
      <div className="h-[100vh] flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const apiError = error as ApiError;
  if (apiError?.status) {
    return (
      <div className="w-full h-full text-xl text-blue-500 font-bold flex justify-center items-center">
        Select chat
      </div>
    );
  }

  return (
    <div className="relative h-[100vh] w-full flex flex-col">
      {/* <ChatMate
        data={userData}
        padding="p-5"
        justify={"justify-start"}
        gap="gap-5"
      /> */}

      {/* for message showing  */}
      {isLoading ? (
        <div className="h-[100vh] flex justify-center items-center">
          Loading...
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-50px)] self-end md:p-5 py-5 flex flex-col-reverse overflow-y-scroll scrollbar-none">
          {chatData?.data?.map((msg: MsgData, index: React.Key) => (
            <Message key={index} msg={msg} />
          ))}
        </div>
      )}

      {/* for message send  */}
      <div className="absolute bottom-0 h-[50px] flex justify-between w-[100%] right-[50%] translate-x-[50%] border">
        <div className="md:w-[5%] w-[10%] h-full flex justify-center items-center cursor-pointer">
          <MdOutlineEmojiEmotions
            onClick={() => setOpenEmoji(!openEmoji)}
            size={30}
          />
          {openEmoji && (
            <div
              className="absolute md:right-0 right-5 bottom-10"
              onMouseLeave={() => setOpenEmoji(false)}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        {/* for file sending  */}
        <div className="md:w-[5%] w-[10%] h-full flex justify-center items-center cursor-pointer">
          <MdAttachFile onClick={open} size={30} />
          <Modal
            opened={opened}
            onClose={close}
            title="Drop your file here"
            centered
          >
            <FileSend />
          </Modal>
        </div>

        <div className="flex w-full md:w-[90%] h-full bg-slate-200 rounded-full overflow-hidden mx-1 md:mx-5">
          <input
            disabled={getMsgLoading}
            type="text"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={messageHandler}
            placeholder="Enter your message..."
            className="outline-none text-sm p-2 md:px-5 w-full rounded-full h-full bg-slate-200"
          />
          <button
            disabled={getMsgLoading}
            onClick={handleSendMessage}
            className="md:w-48 w-20 h-full rounded-full flex justify-center items-center bg-primary hover:bg-primary-600 text-white"
          >
            <IoIosSend size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
