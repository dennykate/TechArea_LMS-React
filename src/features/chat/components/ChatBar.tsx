import { ScrollArea } from "@mantine/core";
import ChatMate from "./ChatMate";

const ChatBar = () => {
  return (
    <ScrollArea h="90vh" display={"flex"}>
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
      <ChatMate justify={"justify-start"} gap={"gap-10"} />
    </ScrollArea>
  );
};

export default ChatBar;
