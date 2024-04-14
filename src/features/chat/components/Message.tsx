import { Avatar, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import toast from "react-hot-toast";
import { usePostDataMutation } from "@/redux/api/formApi";

interface MsgProps {
  msg: {
    is_sender: boolean;
    message: string;
    id: string;
    attachment: null | string;
  };
}

const Message: React.FC<MsgProps> = ({ msg }) => {
  const [deleteMsg, { isLoading }] = usePostDataMutation();

  const [opened, { open, close }] = useDisclosure();
  console.log(msg);

  const deleteMessageHandler = async () => {
    try {
      const response = await deleteMsg({
        url: `${msg?.attachment === null ? `/messages/${msg.id}` : `/group-chat-messages/${msg.id}`}`,
        method: "DELETE",
      }).unwrap();
      console.log(response);
      if (response.status === "success") {
        toast.success("Message deleted successfully!");
        close();
      } else {
        close();
        toast.error(`Your message was deleted!`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onDoubleClick={() => msg.is_sender && open()}
      className={`w-full flex items-center ${
        !msg.is_sender ? "justify-start" : "justify-end"
      }`}
    >
      {!msg.is_sender && (
        <Avatar
          radius="100%"
          size="md"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
      )}

      <div
        className={`flex m-2 p-3 w-1/3 ${
          !msg.is_sender
            ? "bg-black text-white rounded-t-lg rounded-e-xl"
            : "bg-slate-300 text-gray-800 rounded-t-xl rounded-s-xl"
        }`}
      >
        {msg.message}
      </div>

      <Modal title="Delete Message" onClose={close} opened={opened}>
        <div className="flex flex-col text-lg justify-center w-full items-center gap-5">
          <p>Are you sure you want to delete this message?</p>
          <Button
            onClick={deleteMessageHandler}
            fullWidth
            variant="outline"
            color="red"
            loading={isLoading}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Message;
