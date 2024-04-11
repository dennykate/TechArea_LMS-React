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
import { useGetChatDataQuery } from "@/redux/api/chatApi";
import Message from "./Message";

interface MsgData {
  is_sender: boolean;
  message: string;
}

const CharRom: React.FC = () => {
  const { messageHandler, inputValue, appendEmoji } = useMessageHandler();

  const [openEmoji, setOpenEmoji] = useState(false);

  const handleEmojiClick = (emojiObject: { emoji: string }): void => {
    appendEmoji(emojiObject.emoji);
  };
  // console.log(inputValue);
  const userData = useSelector(selectCurrentChatData);
  // console.log(userData)

  const [opened, { open, close }] = useDisclosure();

  // message
  const { data, error, isLoading } = useGetChatDataQuery({
    url: userData?.id ? `/messages?conversation_id=${userData.id}` : undefined,
    method: "GET",
  });

  console.log(data);

  if (isLoading)
    return (
      <div className="h-[100vh] flex justify-center items-center">
        Loading...
      </div>
    );
  if (error) return <div>Error</div>;

  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="w-full h-[10vh]">
        <ChatMate
          data={userData}
          padding="p-5"
          justify={"justify-start"}
          gap="gap-5"
        />
      </div>
      {/* message will here  */}
      <div className="w-full h-full p-5 flex flex-col">
        <div>
          {data?.data?.map(
            (el: MsgData, index: React.Key | null | undefined) => (
              <Message key={index} msg={el} />
            )
          )}
        </div>
      </div>

      <div className="absolute bottom-0 h-[45px] flex w-[100%] right-[50%] translate-x-[50%] border">
        {/* for emoji  */}
        <div className="w-[5%] h-full flex justify-center items-center cursor-pointer">
          <MdOutlineEmojiEmotions
            onClick={() => setOpenEmoji(!openEmoji)}
            size={30}
          />
          <div
            className="absolute bottom-10"
            onMouseLeave={() => setOpenEmoji(false)}
          >
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmojiClick} />
          </div>
        </div>
        {/* for file  */}
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
            onChange={messageHandler}
            placeholder="Enter your message..."
            className="outline-none p-2 px-5 w-full rounded-full h-full bg-slate-200"
          />
          <div className="w-48 h-full rounded-full flex justify-center items-center bg-blue-500 hover:bg-blue-400 text-white">
            <IoIosSend size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharRom;
