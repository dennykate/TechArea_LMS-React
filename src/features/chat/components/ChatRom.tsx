import React from "react"; // Import React
import { HoverCard } from "@mantine/core";
import { IoIosSend } from "react-icons/io";
import ChatMate from "./ChatMate";
import { useMessageHandler } from "@/utilities/messageHandler";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const CharRom: React.FC = () => {
  const { messageHandler, inputValue, appendEmoji } = useMessageHandler();

  const handleEmojiClick = (emojiObject: { emoji: string }): void => {
    appendEmoji(emojiObject.emoji);
    console.log(emojiObject.emoji);
  };

  return (
    <div className="relative h-full w-full flex">
      <div className="w-full">
        <ChatMate justify={"justify-start"} gap="gap-5" />
      </div>
      <div className="absolute bottom-0 h-[40px] flex w-[100%] right-[50%] translate-x-[50%] border">
        <div className="w-[10%] h-full flex justify-center items-center">
          <HoverCard width={280} shadow="md" position="top" openDelay={1}>
            <HoverCard.Target>
              <MdOutlineEmojiEmotions size={30} />
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <div className="absolute bottom-0">
                <EmojiPicker open={true} onEmojiClick={handleEmojiClick} />
              </div>
            </HoverCard.Dropdown>
          </HoverCard>
        </div>
        <div className="flex w-[90%] h-full bg-slate-300 rounded-full overflow-hidden">
          <input
            type="text"
            value={inputValue}
            onChange={messageHandler}
            className="outline-none p-2 px-5 w-full rounded-full h-full bg-slate-300"
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
