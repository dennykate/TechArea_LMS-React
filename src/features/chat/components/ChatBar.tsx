import ChatMate from "./ChatMate";
import Profile from "./Profile";
import { IoChatbubbles } from "react-icons/io5";
import { useGetDataQuery } from "@/redux/api/queryApi";
import { Key } from "react";

interface GetDataResponse {
  data?: { data: [] };
  error?: string;
  isLoading: boolean;
  url: string;
  method: string;
}

interface Data {
  partner: { role: string; name: string; profile: string };
  last_message: string;
}

const ChatBar: React.FC = () => {
  const { data, error, isLoading } = useGetDataQuery<GetDataResponse>({
    url: `conversations`,
    method: "GET",
  });

  // console.log(data);

  if (isLoading)
    return (
      <div className="h-[100vh] flex justify-center items-center">
        Loading...
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <div className="h-[10vh] flex border rounded justify-center items-center">
        <p className="flex text-3xl items-center font-semibold gap-3">
          Chat Room <IoChatbubbles />
        </p>
      </div>
      <div className=" h-[80vh] scrollbar-none bg-slate-100 overflow-y-scroll flex flex-col">
        {data?.data?.map((el: Data, index: Key | null | undefined) => (
          <ChatMate
            data={el}
            key={index}
            padding="p-5"
            justify="justify-start"
            gap="gap-3"
          />
        ))}
      </div>
      <div className="h-[10vh] flex">
        <Profile gap="gap-3" />
      </div>
    </div>
  );
};

export default ChatBar;
