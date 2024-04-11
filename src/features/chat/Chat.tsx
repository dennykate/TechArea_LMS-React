import ChatRom from "./components/ChatRom";
import ChatBar from "./components/ChatBar";
import Cookies from "js-cookie";
const Chat = () => {
  Cookies.set("token", "9|xcsix5iUp5ncJRXzHcT9JiV7TesHkcoBaB6LIFJ002ef3f92");
  // console.log(token);
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
