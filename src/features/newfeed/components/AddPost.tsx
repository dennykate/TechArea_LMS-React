import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import UploadField from "./UploadField";
interface StateProps {
  latest: boolean;
  setLatest: (latest: boolean) => void;
}
const AddPost: React.FC<StateProps> = ({ latest, setLatest }) => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <div className="my-5 rounded shadow md:p-5 p-3 w-full bg-white flex flex-col items-center justify-center gap-5">
      <div className="flex gap-5 w-full pt-5">
        <img
          className=" rounded-full w-10 h-10 md:w-12 md:h-12"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
        <input
          onClick={open}
          disabled={opened}
          className="py-1 px-5 outline-none border w-11/12 rounded-full bg-gray-200"
          placeholder="What's on your mind..."
          type="text"
        />
      </div>

      {/* for post upload model  */}
      <Modal
        centered
        size={"lg"}
        opened={opened}
        onClose={close}
        title="Post Upload"
      >
        <UploadField latest={latest} setLatest={setLatest} close={close} />
      </Modal>
    </div>
  );
};

export default AddPost;
