import { ScrollArea } from "@mantine/core";
import ChatMate from "./ChatMate";
import Profile from "./Profile";
import { IoChatbubbles } from "react-icons/io5";
const ChatBar = () => {
  return (
    <div>
      <div className="h-[10vh] flex border rounded justify-center items-center">
        <p className="flex text-3xl items-center font-semibold gap-3">
          Char Room <IoChatbubbles />
        </p>
      </div>
      <ScrollArea h="80vh" display={"flex"}>
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-3"} />
      </ScrollArea>
      <div className="h-[10vh] flex">
        <Profile gap="gap-3" />
      </div>
    </div>
  );
};

export default ChatBar;
