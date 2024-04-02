import ChatRom from "./components/ChatRom";
import ChatBar from "./components/ChatBar";

const Chat = () => {
  return (
    <div className="flex overflow-hidden h-[calc(100vh-70px)]">
      <div className="w-9/12">
        <ChatRom />
      </div>
      <div className=" w-3/12">
        <ChatBar />
      </div>
    </div>
  );
};

export default Chat;
