/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Avatar, Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import toast from "react-hot-toast";
import { usePostDataMutation } from "@/redux/api/formApi";
import { BiDownload } from "react-icons/bi";

interface MsgProps {
  msg: {
    sender: any;
    is_sender: boolean;
    message: string;
    id: string;
    attachment: null | string;
    created_at_time: string;
  };
  setMessages: any;
}

const Message: React.FC<MsgProps> = ({ msg, setMessages }) => {
  const [deleteMsg, { isLoading }] = usePostDataMutation();
  const [opened, { open, close }] = useDisclosure();

  const isImage = (url: string) =>
    /\.(jpeg|jpg|gif|png)$/.test(url?.toLowerCase());
  const isDocument = (url: string) =>
    /\.(pdf|doc|docx)$/.test(url?.toLowerCase());

  const getFileName = (url: string) => url.split("/").pop() || "Unknown file";

  const deleteMessageHandler = async () => {
    try {
      const response = await deleteMsg({
        url: `${
          msg?.attachment === null
            ? `/messages/${msg.id}`
            : `/group-chat-messages/${msg.id}`
        }`,
        method: "DELETE",
      }).unwrap();
      if (response.status === "success") {
        toast.success("Message deleted successfully!");
        close();
      } else {
        close();
        toast.error(`Your message was deleted!`);
      }

      setMessages((prev: any[]) => {
        return prev?.filter((item) => item?.id != msg?.id);
      });
    } catch (err) {
      console.error(err);
    }
  };
  const openInNewTab = (url: string | null) => {
    const newWindow = window.open(
      url as string,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };
  return (
    <div
      className={`w-full cursor-default flex gap-3 items-start ${
        !msg.is_sender ? "justify-start" : "justify-end"
      }`}
    >
      {!msg?.is_sender && (
        <Avatar radius="100%" size="md" src={msg?.sender?.profile} />
      )}
      <div
        onDoubleClick={() => msg.is_sender && open()}
        className={`flex flex-col items-end p-3 md:max-w-[600px] sm:max-w-[500px] max-w-[250px] ${
          !msg?.is_sender
            ? "bg-black text-white rounded-t-lg rounded-e-xl"
            : "bg-slate-200 text-gray-800 rounded-t-xl rounded-s-xl"
        }`}
      >
        {msg.attachment ? (
          msg?.attachment === null ? (
            <div className="flex flex-col">
              <p>{msg.message}</p>
              <div className="w-full flex items-center justify-end mt-1">
                <Text size={"xs"} color="dimmed">
                  {msg.created_at_time}
                </Text>
              </div>
            </div>
          ) : isImage(msg.attachment) ? (
            <>
              <img className="w-[250px] " src={msg.attachment} alt="" />
              <div className="w-full flex items-center justify-end mt-1">
                <Text size={"xs"} color="dimmed">
                  {msg.created_at_time}
                </Text>
              </div>
            </>
          ) : isDocument(msg.attachment) ? (
            <div
              onClick={() => openInNewTab(msg.attachment)}
              className="flex cursor-pointer gap-2 w-full items-center group flex-col"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="min-w-[50px] flex justify-center items-center">
                  <BiDownload size={28} />
                </div>
                <Text size="sm" className="group-hover:underline truncate">
                  {getFileName(msg.attachment)}
                </Text>
              </div>

              <div className="w-full flex items-center justify-end mt-1">
                <Text size={"xs"} color="dimmed">
                  {msg.created_at_time}
                </Text>
              </div>
            </div>
          ) : (
            <div
              onClick={() => openInNewTab(msg.attachment)}
              className="flex cursor-pointer gap-2 items-center group flex-col"
            >
              <div className="flex items-center gap-2">
                <div className="min-w-[50px] flex justify-center items-center">
                  <BiDownload size={28} />
                </div>
                <Text size="sm" className="group-hover:underline">
                  {getFileName(msg.attachment)}
                </Text>
              </div>

              <div className="w-full flex items-center justify-end mt-1">
                <Text size={"xs"} color="dimmed">
                  {msg.created_at_time}
                </Text>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col">
            <p>{msg.message}</p>
            <div className="flex justify-end">
              <Text size={"xs"} color="dimmed">
                {msg.created_at_time}
              </Text>
            </div>
          </div>
        )}
      </div>

      <Modal title="Delete Message" onClose={close} opened={opened} centered>
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
