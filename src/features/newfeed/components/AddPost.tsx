/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import UploadField from "./UploadField";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
interface StateProps {
  latest: boolean;
  setLatest: (latest: boolean) => void;
  setPosts?: any;
}
const AddPost: React.FC<StateProps> = ({ latest, setLatest, setPosts }) => {
  const [opened, { open, close }] = useDisclosure();
  const { get } = useEncryptStorage();
  const userData: {
    id: string;
    profile: null;
    gender: string | null;
    name: string;
  } = JSON.parse(get("userInfo") as string);

  return (
    <div
      className="rounded shadow md:p-5 p-3 w-full bg-white flex flex-col 
    items-center justify-center gap-5"
    >
      <div className="flex items-center gap-2 sm:gap-5 w-full">
        <Avatar className=" rounded-full" size={"lg"} src={userData?.profile} />
        <input
          onClick={open}
          disabled={opened}
          className="sm:h-[50px] h-[40px] px-5 outline-none border w-11/12 rounded-full bg-gray-200"
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
        <UploadField
          latest={latest}
          setLatest={setLatest}
          close={close}
          setPosts={setPosts}
        />
      </Modal>
    </div>
  );
};

export default AddPost;
