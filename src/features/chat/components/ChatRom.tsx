/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useMessageHandler } from "@/utilities/messageHandler";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { MdAttachFile } from "react-icons/md";
import { Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FileSend from "./FileSend";
import { useSelector } from "react-redux";
import { selectCurrentChatData } from "@/redux/services/chatSlice";
import Message from "./Message";
import Cookies from "js-cookie";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import { useSendMessageMutation } from "@/redux/api/queryApi";
import useQuery from "@/hooks/useQuery";
import InfiniteScrollObserver from "./InfiniteScrollObserver";

const ChatRoom: React.FC = () => {
  const messagesEndRef = useRef<any>(null);
  const { messageHandler, inputValue, appendEmoji, setInputValue } =
    useMessageHandler();
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  const [sendMessage, { isLoading: getMsgLoading }] = useSendMessageMutation();

  const [opened, { open, close }] = useDisclosure();

  // for report
  const { get } = useEncryptStorage();

  const selfData: {
    role_id: string;
  } = JSON.parse(get("userInfo") as string);

  const userData = useSelector(selectCurrentChatData);

  const userId: string | undefined = useMemo(
    () => Cookies.get("user_id"),
    [userData]
  );
  const lastConversation: string | undefined = useMemo(
    () => Cookies.get("last_conversation"),
    [userData]
  );
  const chatType = useMemo(() => Cookies.get("chat_type"), [userData]);

  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [finalPage, setFinalPage] = useState<number>(0);

  console.log("chatType => ", chatType);

  const endpoint = useMemo(
    () =>
      chatType && lastConversation
        ? chatType === "single-chat"
          ? `/messages?conversation_id=${lastConversation}&limit=20&page=${page}`
          : `/group-chat-messages?group_chat_id=${lastConversation}&limit=20&page=${page}`
        : "",
    [chatType, lastConversation, page]
  );

  useEffect(() => {
    console.log("endpoint => ", endpoint);
  }, [endpoint]);

  const { isLoading } = useQuery(
    endpoint,
    (data, meta) => {
      setTotal(meta?.total);
      setFinalPage(meta?.last_page);

      setMessages((prev: any[]) => {
        return [...prev, ...data];
      });
    },
    endpoint === ""
  );

  useEffect(() => {
    if (page === 1) messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  // useEffect(() => {
  //   setMessages([]);
  //   setPage(1);
  // }, [userData]);

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

  const handleSendMessage = async () => {
    if (!userId || !lastConversation) {
      console.error("User ID or last conversation ID is undefined.");
      return;
    }

    try {
      const formData = new URLSearchParams();

      if (chatType === "single-chat") {
        formData.append("partner_id", userId);
      } else {
        formData.append("group_chat_id", lastConversation);
      }

      formData.append("message", inputValue);

      const payload = {
        url: chatType === "single-chat" ? "/messages" : "/group-chat-messages",
        method: "POST",
        body: formData,
      };

      const res = (await sendMessage(payload)) as any;
      setInputValue("");

      if (res?.data) {
        setMessages((prev) => [res?.data, ...prev]);

        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    appendEmoji(emojiObject.emoji);
  };

  // if (isLoading) {
  //   return (
  //     <div className="h-[100vh] flex justify-center items-center">
  //       <Loader color="blue" />
  //     </div>
  //   );
  // }

  console.log("messages => ",messages)

  return (
    <div className="relative h-[100vh] w-full flex flex-col">
      <div
        className="w-full h-[calc(100vh-50px)] md:p-5 py-5 flex flex-col-reverse  
        overflow-y-scroll scrollbar-none "
      >
        <InfiniteScrollObserver
          isLoading={isLoading as boolean}
          onFetch={() => {
            if (!isLoading && page < finalPage) setPage((prev) => prev + 1);
          }}
        >
          <div ref={messagesEndRef} />
          <div className="flex flex-col-reverse w-full ">
            {messages.map((msg, index) => (
              <Message key={index} msg={msg} />
            ))}
          </div>
        </InfiniteScrollObserver>
      </div>

      {/* for message send  */}
      <div
        className="absolute bottom-0 h-[50px] flex justify-between w-[100%] right-[50%] translate-x-[50%] 
      border"
      >
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
        {selfData?.role_id !== "2" &&
          !userData?.description &&
          userData?.partner?.role === "Teacher" && (
            <div className="md:w-[5%] w-[10%] h-full flex justify-center items-center cursor-pointer">
              <MdAttachFile onClick={open} size={30} />
              <Modal
                opened={opened}
                onClose={close}
                title="Drop your file here"
                centered
              >
                <FileSend close={close} />
              </Modal>
            </div>
          )}

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
