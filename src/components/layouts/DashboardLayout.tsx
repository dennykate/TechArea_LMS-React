import { twMerge } from "tailwind-merge";
import { Drawer } from "@mantine/core";
import { useEffect } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import NavBar from "../navBar/NavBar";
import SideBar from "../sideBar/SideBar";
import Footer from "../footers/Footer";
import { useLocation } from "react-router-dom";

interface PropsType {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: PropsType) => {
  const matches = useMediaQuery("(max-width: 796px)");


  const [opened, { toggle, close, open }] = useDisclosure(false);

  const { pathname } = useLocation();

  useEffect(() => {
    matches && close();
  }, [pathname]);

  useEffect(() => {
    if (matches != undefined) {
      if (!matches) open();
    }
  }, [matches]);

  return (
    <div className="flex items-start h-screen overflow-hidden">
      {matches && (
        <Drawer
          opened={opened}
          onClose={close}
          withCloseButton={false}
          classNames={{
            content: "max-w-[260px] ",
            body: "p-0 ",
          }}
        >
          
          <SideBar opened={opened} />

        </Drawer>
      )}

      {!matches && <SideBar opened={opened} />}

      <div
        className={twMerge(
          "h-full transition-all duration-300 ease-in-out",
          opened && !matches ? "w-[calc(100%-260px)]" : "w-full"
        )}
      >
        <NavBar toggle={toggle} />

        <div
          className="sm:h-[calc(100%-70px)] h-[calc(100%-50px)] w-full 
        overflow-y-auto bg-gray-100 flex justify-between flex-col"
        >
          {children}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
