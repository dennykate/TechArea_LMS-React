/* eslint-disable @typescript-eslint/no-explicit-any */
import ChatMate from "./ChatMate";
import Profile from "./Profile";
import { IoChatbubbles } from "react-icons/io5";
import { Key, useMemo } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Loader, Modal } from "@mantine/core";
// import GroupChatMate from "./GroupChatMate";
import AddSingleChat from "./AddSingleChat";
import { FaUserPlus } from "react-icons/fa6";
import { useGetDataQuery } from "@/redux/api/queryApi";
import { Link } from "react-router-dom";

interface Data {
  partner: { role: string; name: string; profile: string; id: string };
  last_message: string;
  id: string;
  name: string;
  image: string;
  description: string;
}
interface FunProps {
  toggleChatRoom: () => void;
}

const ReportBar: React.FC<FunProps> = ({ toggleChatRoom }) => {
  const { data, error, isLoading } = useGetDataQuery(`conversations`);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const [
    singleModalOpened,
    { open: openSingleModal, close: closeSingleModal },
  ] = useDisclosure();

  const handleCloseSingle = () => {
    closeSingleModal();
  };

  const filteredData = useMemo(() => {
    return data?.data?.filter((dt: any) => dt?.partner?.role != "Student");
  }, [data]);

  if (isLoading)
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Loader color="blue" />
      </div>
    );

  if (error) return <div>Error</div>;

  return (
    <div>
      <div className="h-[10vh] flex border rounded justify-between px-2 md:px-5 items-center">
        <Link
          to="/dashboard"
          className="flex text-2xl items-center font-semibold gap-3"
        >
          Report Room <IoChatbubbles />
        </Link>
        <div className="flex gap-4">
          <FaUserPlus
            onClick={openSingleModal}
            className="text-primary cursor-pointer"
            size={22}
          />
        </div>
      </div>
      <div
        onClick={toggleChatRoom}
        className=" h-[calc(90vh-50px)] scrollbar-none bg-slate-100 overflow-y-scroll flex flex-col py-2"
      >
        {filteredData.map((el: Data, index: Key | null | undefined) => (
          <ChatMate
            data={el}
            key={index}
            padding="p-5"
            justify="justify-start"
            gap="gap-3"
          />
        ))}
      </div>
      <div className="h-[50px] flex">
        <Profile gap="gap-3" />
      </div>

      <Modal
        centered
        fullScreen={isMobile}
        size={"xl"}
        opened={singleModalOpened}
        onClose={handleCloseSingle}
      >
        <AddSingleChat close={closeSingleModal} />
      </Modal>
    </div>
  );
};

export default ReportBar;
