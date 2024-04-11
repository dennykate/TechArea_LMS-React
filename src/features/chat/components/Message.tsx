import { Avatar } from "@mantine/core";

const Message = ({ msg }) => {
  console.log(msg);
  return (
    <div
      className={`w-full flex items-center ${
        msg?.is_sender ? "justify-start " : " justify-end"
      } `}
    >
      {msg?.is_sender && (
        <Avatar
          radius={"100%"}
          size={"md"}
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
        />
      )}

      <div
        className={`  flex m-2 p-3 w-1/3 ${
          msg?.is_sender
            ? " bg-black text-white rounded-t-lg rounded-e-xl"
            : " bg-slate-300 text-gray-800 rounded-t-xl rounded-s-xl"
        }`}
      >
        {msg?.message}
      </div>
    </div>
  );
};

export default Message;
