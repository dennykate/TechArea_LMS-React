import { ScrollArea, Tooltip } from "@mantine/core";
import Post from "./components/Post";
import { TbTextPlus } from "react-icons/tb";
import { Link } from "react-router-dom";

const NewFeed = () => {
  return (
    <div className=" w-full flex justify-center items-center relative">
      <ScrollArea h={"90vh"} w={"50%"}>
        <div className="flex flex-col gap-5 ">
          <Post parent="newfeed" />
          <Post parent="newfeed" />
        </div>
      </ScrollArea>

      <Tooltip label="post upload">
        <Link
          to={"/upload"}
          className="text-3xl cursor-pointer w-16 h-16 hover:bg-blue-400 bg-blue-500 text-white font-bold flex justify-center items-center rounded-full absolute right-10 bottom-10"
        >
          <TbTextPlus />
        </Link>
      </Tooltip>
    </div>
  );
};

export default NewFeed;
