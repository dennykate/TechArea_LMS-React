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
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hook";
import { regenrate } from "@/redux/services/keySlice";

const ChatRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<any>(null);
  const { messageHandler, inputValue, appendEmoji, setInputValue } =
    useMessageHandler();
  const [sendMessage, { isLoading: getMsgLoading }] = useSendMessageMutation();

  const [opened, { open, close }] = useDisclosure();
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [userId, setUserId] = useState<any>(
    Cookies.get("user_id") ?? undefined
  );
  const [userRole, setUserRole] = useState<any>(
    Cookies.get("user_role") ?? undefined
  );
  const [lastConversation, setLastConservation] = useState<any>(
    Cookies.get("last_conversation") ?? undefined
  );
  const [chatType, setChatType] = useState<any>(
    Cookies.get("chat_type") ?? undefined
  );

  // for report
  const { get } = useEncryptStorage();

  const selfData: {
    role_id: string;
  } = JSON.parse(get("userInfo") as string);

  const currentChat = useSelector(selectCurrentChatData);

  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<any[]>([]);
  const [finalPage, setFinalPage] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const endpoint = useMemo(
    () =>
      chatType && lastConversation
        ? chatType === "single-chat"
          ? `/messages?partner_id=${userId}&limit=50&page=${page}`
          : `/group-chat-messages?group_chat_id=${lastConversation}&limit=50&page=${page}`
        : "",
    [lastConversation, page]
  );

  const { isLoading, isError } = useQuery(
    endpoint,
    (data, meta) => {
      setFinalPage(meta?.last_page);

      setMessages((prev: any[]) => {
        return [...prev, ...data];
      });

      setTimeout(() => {
        setIsFetching(false);
      }, 3000);
    },
    false,
    true,
    false
  );

  useEffect(() => {
    if (page === 1) messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (currentChat?.id) {
      setMessages([]);
      setPage(1);
      setFinalPage(1);
      setIsFetching(true);
      setChatType(currentChat?.chatType);
      setLastConservation(currentChat?.id);

      if (currentChat?.chatType === "single-chat") {
        setUserId(currentChat?.partner?.id);
        setUserRole(currentChat?.partner?.role);
      } else if (currentChat?.chatType === "group-chat")
        setUserId(currentChat?.id);

      dispatch(regenrate());
    }
  }, [currentChat]);

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
      toast.error("User ID or last conversation ID is undefined.");
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
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
          setMessages((prev) => [res?.data?.data, ...prev]);
        }, 100);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    appendEmoji(emojiObject.emoji);
  };

  if (!userId || !lastConversation || isError) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center bg-white">
        <p className="text-base underline font-[400]">Please Select Chat</p>
      </div>
    );
  }

  if (isLoading && page === 1) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <Loader color="blue" />
      </div>
    );
  }

  return (
    <div
      onClick={() => setOpenEmoji(false)}
      className="relative h-[100vh] w-full flex flex-col"
    >
      <div
        className="w-full h-[calc(100vh-50px)] sm:p-5 px-2 py-4  flex flex-col-reverse  
        overflow-y-scroll scrollbar-none "
      >
        <InfiniteScrollObserver
          isLoading={isFetching as boolean}
          onLoad={() => {
            if (page < finalPage) {
              setIsFetching(true);
            }
          }}
          onFetch={() => {
            if (!isFetching && page < finalPage) setPage((prev) => prev + 1);
          }}
        >
          <div ref={messagesEndRef} />
          <div className="flex flex-col-reverse w-full gap-3">
            {messages?.map((msg, index) => (
              <Message key={index} msg={msg} setMessages={setMessages} />
            ))}
          </div>
        </InfiniteScrollObserver>
      </div>

      {/* for message send  */}
      <div
        className="absolute bottom-0 h-[50px] flex justify-center gap-4 w-full
      border md:px-5 px-1"
      >
        <div className="sm:w-[10%] w-[20%] flex justify-center items-center gap-4">
          <div className=" h-full flex justify-center items-center cursor-pointer relative">
            <MdOutlineEmojiEmotions
              onClick={(e) => {
                e.stopPropagation();
                setOpenEmoji(!openEmoji);
              }}
              size={30}
            />
            {openEmoji && (
              <div
                className="absolute md:left-0 left-5 bottom-10"
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setOpenEmoji(false);
                }}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          {/* for file sending  */}
          {selfData?.role_id !== "2" && userRole === "Teacher" && (
            <div className="h-full flex justify-center items-center cursor-pointer">
              <MdAttachFile onClick={open} size={30} />
              <Modal
                opened={opened}
                onClose={close}
                title="Drop your file here"
                centered
              >
                <FileSend
                  close={close}
                  receiverId={userId}
                  onSuccess={(data) => {
                    setMessages((prev) => [data, ...prev]);
                  }}
                />
              </Modal>
            </div>
          )}
        </div>

        <div className="flex sm:w-[90%] w-[80%] h-full bg-slate-200 rounded-full overflow-hidden ">
          <input
            disabled={getMsgLoading}
            type="text"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={messageHandler}
            placeholder="Enter your message..."
            className="outline-none text-sm px-4 md:px-5 w-full rounded-full h-full bg-slate-200"
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
