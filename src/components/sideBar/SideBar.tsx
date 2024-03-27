/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, ScrollArea } from "@mantine/core";
import { HiOutlineLogout } from "react-icons/hi";

import SideBarLinksGroup from "./SideBarLinksGroup";
import sideBarTabs from "@/data/sideBarTabs";
import { Logo } from "../";
import { twMerge } from "tailwind-merge";
import { useEncryptStorage } from "use-encrypt-storage";
import { useNavigate } from "react-router-dom";

interface PropsType {
  opened: boolean;
}

const SideBar = ({ opened }: PropsType) => {
  const navigate = useNavigate();
  const { remove } = useEncryptStorage();

  const links = sideBarTabs.map((item: any) => (
    <SideBarLinksGroup {...item} key={item.label} />
  ));

  const onLogoutHandler = () => {
    remove("name");
    navigate("/login");
  };

  return (
    <nav
      className={twMerge(
        "h-screen  bg-white   transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ",
        opened ? "w-[230px]" : "w-0"
      )}
    >
      <div className="h-[70px] flex items-center px-2 w-full ">
        <Logo />
      </div>

      <ScrollArea className="px-2 h-[calc(100%-120px)] overflow-y-auto w-full">
        <Divider opacity={0.5} />

        {links}
      </ScrollArea>

      <button
        className="h-[50px] w-full flex items-center lg:px-6 px-4 justify-start gap-4 hover:bg-gray-100
       border-t border-black border-opacity-20 "
        onClick={onLogoutHandler}
      >
        <HiOutlineLogout className="lg:text-xl text-lg text-black" />
        <span className="lg:text-base text-sm font-[400]">Logout</span>
      </button>
    </nav>
  );
};

export default SideBar;
