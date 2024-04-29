import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ChatBar from "./components/ChatBar";
import { IoIosArrowRoundBack } from "react-icons/io";
import ChatRoom from "./components/ChatRom";
import { useMediaQuery } from "@mantine/hooks";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery("(max-width: 768px)");

  const toggleChatRoom = () => {
    if (matches) {
      console.log("Toggling chat room:", !isOpen);
      setIsOpen(!isOpen);
    } else {
      console.log("Toggle disabled due to window width greater than 768px");
    }
  };

  const variants = {
    open: { right: "100vw" },
    closed: { right: "0vw" },
  };

  useEffect(() => {
    if (matches) {
      setIsOpen(true);
    }
  }, [matches]);

  return (
    <div className=" overflow-hidden w-[100vw] ">
      <motion.div
        className="flex relative w-[200vw] md:w-screen "
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full md:w-3/12">
          <ChatBar toggleChatRoom={toggleChatRoom} />
        </div>
        <div className="w-full md:w-9/12 relative ">
          <div
            onClick={toggleChatRoom}
            className="absolute z-50 top-5 left-5 md:hidden"
          >
            <IoIosArrowRoundBack
              size={20}
              className="bg-primary hover:bg-primary-600 w-10 h-10 rounded-full text-white"
            />
          </div>
          <ChatRoom />
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;
