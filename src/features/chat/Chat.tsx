import ChatRom from "./components/ChatRom";
import ChatBar from "./components/ChatBar";

const Chat = () => {
  return (
    <div className="flex overflow-hidden">
      <div className=" w-3/12">
        <ChatBar />
      </div>
      <div className="w-9/12">
        <ChatRom />
      </div>
    </div>
  );
};

export default Chat;
