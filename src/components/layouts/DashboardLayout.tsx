import { twMerge } from "tailwind-merge";
import { Drawer } from "@mantine/core";
import { useEffect } from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import NavBar from "../navBar/NavBar";
import SideBar from "../sideBar/SideBar";
import Footer from "../footers/Footer";
import { useLocation } from "react-router-dom";
import useUserInfo from "@/hooks/use-user-info";
import toast from "react-hot-toast";
import useLogout from "@/hooks/useLogout";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import config from "@/config";

interface PropsType {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: PropsType) => {
  const { get } = useEncryptStorage();
  const userInfo = useUserInfo();
  const logout = useLogout();
  const matches = useMediaQuery("(max-width: 796px)");
  const { pathname } = useLocation();

  const token = get("token");

  const [opened, { toggle, close, open }] = useDisclosure(false);

  const checkLearningAccess = async () => {
    if (userInfo && userInfo?.role_id == "1" && userInfo?.learning_expire_at) {
      try {
        const res = await fetch(
          config.baseUrl + "/users/check/learning-access",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!data?.success) {
          toast.error("Your learning access has already expired");

          logout();
        }
      } catch (error) {
        console.log("Catch Error => ", error);
      }
    }
  };

  useEffect(() => {
    matches && close();
  }, [pathname]);

  useEffect(() => {
    if (matches != undefined) {
      if (!matches) open();
    }
  }, [matches]);

  useEffect(() => {
    checkLearningAccess();
  }, [userInfo, pathname]);

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
        overflow-y-auto bg-gray-100 flex flex-col justify-between "
        >
          {children}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
