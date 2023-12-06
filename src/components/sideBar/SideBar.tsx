/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollArea } from "@mantine/core";
import { HiOutlineLogout } from "react-icons/hi";

import SideBarLinksGroup from "./SideBarLinksGroup";
import sideBarTabs from "@/data/sideBarTabs";
import { Logo } from "../";

interface PropsType {
  opened: boolean;
}

const SideBar = ({ opened }: PropsType) => {
  const links = sideBarTabs.map((item: any) => (
    <SideBarLinksGroup {...item} key={item.label} />
  ));

  return (
    <nav
      className={`h-screen  bg-white ${
        opened
          ? "lg:min-w-[250px] min-w-[220px] lg:w-[250px] w-[220px]"
          : "w-0 min-w-0"
      } transition-all duration-100 ease-in-out whitespace-nowrap overflow-hidden `}
    >
      <div className="h-[70px] flex items-center px-2 lg:min-w-[250px] min-w-[220px]">
        <Logo />
      </div>

      <ScrollArea className="px-2 mt-2 h-[calc(100%-128px)] overflow-y-auto lg:min-w-[250px] min-w-[220px]">
        {links}
      </ScrollArea>

      <button
        className="h-[50px] lg:min-w-[250px] min-w-[220px] flex items-center lg:px-6 px-4 justify-start gap-4 hover:bg-gray-100
       border-t border-black border-opacity-20"
      >
        <HiOutlineLogout className="lg:text-xl text-lg text-black" />
        <span className="lg:text-base text-sm font-[400]">Logout</span>
      </button>
    </nav>
  );
};

export default SideBar;
