import { Input } from "@mantine/core";
import { IoIosSend } from "react-icons/io";
import ChatMate from "./ChatMate";

const CharRom = () => {
  const messageHandler = (e: {
    preventDefault: () => void;
    target: { value: unknown };
  }) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <div className="p-1 relative h-[90vh] w-full flex  ">
      {/* chat mate nav  */}
      <div className="flex absolute top-5 w-[90%] right-[50%] translate-x-[50%]">
        <ChatMate justify={"justify-start"} gap="5" />
      </div>
      <div>

      </div>
      {/* input form  */}
      <div className="absolute bottom-0 w-[90%] right-[50%] translate-x-[50%]">
        <Input
          size="lg"
          placeholder="Enter your message..."
          w={"100%"}
          rightSection={<IoIosSend size={20} color="blue" />}
          pointer
          mt="md"
          onChange={messageHandler}
        />
      </div>
    </div>
  );
};

export default CharRom;
