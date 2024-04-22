import React, { useEffect, useState } from "react";
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
import { useGetDataQuery, usePostDataMutation } from "@/redux/api/queryApi";
import Cookies from "js-cookie";
import InfiniteScroll from "react-infinite-scroll-component";

interface ApiError {
  status: number;
  message: string;
}

const ChatRoom: React.FC = () => {
  const { messageHandler, inputValue, appendEmoji, setInputValue } =
    useMessageHandler();
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);

  const [sendMessage, { isLoading: getMsgLoading }] = usePostDataMutation();

  const [opened, { open, close }] = useDisclosure();

  // console.log(sendMsgError);
  // for user data
  const userData = useSelector(selectCurrentChatData);
  // console.log(userData);

  // for get message
  const userId: string | undefined = Cookies.get("user_id");
  const lastConversation: string | undefined = Cookies.get("last_conversation");

  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const endpoint = userData?.partner
    ? `/messages?conversation_id=${lastConversation}&limit=10&page=${page}`
    : `/group-chat-messages?group_chat_id=${lastConversation}&limit=10&page=${page}`;

  const { data: chatData, error, isLoading } = useGetDataQuery(endpoint);

  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
  }, [userData]);

  useEffect(() => {
    if (chatData?.data) {
      const newMessages = chatData.data.filter(
        (newMsg: { id: string }) =>
          !messages.some((existingMsg) => existingMsg.id === newMsg.id)
      );

      setMessages((prevMessages) => {
        // Check if any new message matches the last message from userData
        const hasSpecialMessage = newMessages.some(
          (newMsg) => newMsg.message === userData.last_message
        );

        // eslint-disable-next-line prefer-const
        let combinedMessages = hasSpecialMessage
          ? [...newMessages, ...prevMessages]
          : [...prevMessages, ...newMessages];

        combinedMessages.sort((a, b) => new Date(b.date) - new Date(a.date));

        return combinedMessages;
      });

      const moreDataAvailable = chatData.data.length === 10;
      setHasMore(moreDataAvailable);
      console.log("More data available: ", moreDataAvailable);
    }
  }, [chatData, userData?.last_message]);

  const fetchMoreMessages = () => {
    console.log("Attempting to fetch more messages");
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(chatData);

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
        <Loader color="blue" />
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
      {/* for message showing  */}
      {isLoading ? (
        <div className="h-[100vh] flex justify-center items-center">
          <Loader color="blue" />
        </div>
      ) : (
        <div
          id="scrollableDiv"
          className="w-full h-[calc(100vh-50px)] self-end md:p-5 py-5 flex flex-col overflow-y-scroll scrollbar-none"
        >
          <InfiniteScroll
            dataLength={messages.length}
            next={fetchMoreMessages}
            hasMore={hasMore}
            loader={
              <h4 className=" w-full justify-center flex">
                <Loader color="blue" />
              </h4>
            }
            scrollThreshold={0.9}
            scrollableTarget="scrollableDiv"
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
            <div className="flex flex-col-reverse items-start">
              {messages.map((msg, index) => (
                <Message key={index} msg={msg} />
              ))}
            </div>
          </InfiniteScroll>
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
