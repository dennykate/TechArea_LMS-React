import { ScrollArea } from "@mantine/core";
import ChatMate from "./ChatMate";
import Profile from "./Profile";

const ChatBar = () => {
  return (
    <div>
      <div className="h-[10vh] flex border rounded justify-center items-center">
        <p>Tech Area</p>
      </div>
      <ScrollArea h="80vh" display={"flex"}>
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
        <ChatMate padding="p-5" justify={"justify-start"} gap={"gap-5"} />
      </ScrollArea>
      <div className="h-[10vh] flex">
        <Profile gap="gap-5" />
      </div>
    </div>
  );
};

export default ChatBar;
