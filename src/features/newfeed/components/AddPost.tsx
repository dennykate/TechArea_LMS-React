import { Avatar, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoNewspaperSharp } from "react-icons/io5";
import UploadField from "./UploadField";
const AddPost = () => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <div className="mt-5 rounded bg-white w-full flex flex-col items-center justify-center gap-5">
      <div className="flex justify-around w-full pt-5">
        <Avatar
          radius={"100%"}
          size={"lg"}
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
        <input
          onClick={open}
          disabled={opened}
          className="py-2 px-5 outline-none border w-3/4 rounded-full bg-gray-200"
          placeholder="What's on your mind..."
          type="text"
        />
      </div>
      <div
        onClick={open}
        className="text-blue-600 border-t w-full flex justify-center text-3xl p-3 hover:bg-gray-200 cursor-pointer"
      >
        <IoNewspaperSharp />
      </div>

      {/* for post upload model  */}
      <Modal
        centered
        size={"xl"}
        opened={opened}
        onClose={close}
        title="Post Upload"
      >
        <UploadField />
      </Modal>
    </div>
  );
};

export default AddPost;
