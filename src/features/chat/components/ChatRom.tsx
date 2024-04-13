import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import ChatMate from "./ChatMate";
import { useMessageHandler } from "@/utilities/messageHandler";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { MdAttachFile } from "react-icons/md";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FileSend from "./FileSend";
import { useSelector } from "react-redux";
import { selectCurrentChatData } from "@/redux/services/chatSlice";
import {
  useGetChatDataQuery,
  useSendMessageMutation,
} from "@/redux/api/chatApi";
import Message from "./Message";

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

  const [sendMessage] = useSendMessageMutation();
  const [opened, { open, close }] = useDisclosure();

  // for user data
  const userData = useSelector(selectCurrentChatData);

  // for get message
  const {
    data: chatData,
    error,
    isLoading,
  } = useGetChatDataQuery({
    url: userData?.id ? `/messages?conversation_id=${userData.id}` : undefined,
    method: "GET",
  });

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
      formData.append("partner_id", userData?.partner?.id.toString());

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
    <div className="relative h-full w-full flex flex-col">
      <ChatMate
        data={userData}
        padding="p-5"
        justify={"justify-start"}
        gap="gap-5"
      />

      {/* for message showing  */}
      <div className="w-full h-full p-5 flex flex-col">
        {chatData?.data?.map((msg: MsgData, index: React.Key) => (
          <Message key={index} msg={msg} />
        ))}
      </div>
      {/* for message send  */}
      <div className="absolute bottom-0 h-[45px] flex w-[100%] right-[50%] translate-x-[50%] border">
        <div className="w-[5%] h-full flex justify-center items-center cursor-pointer">
          <MdOutlineEmojiEmotions
            onClick={() => setOpenEmoji(!openEmoji)}
            size={30}
          />
          {openEmoji && (
            <div
              className="absolute bottom-10"
              onMouseLeave={() => setOpenEmoji(false)}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
        <div className="w-[5%] h-full flex justify-center items-center cursor-pointer">
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
        <div className="flex w-[90%] h-full bg-slate-200 rounded-full overflow-hidden mx-5">
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

export default ChatRoom;
