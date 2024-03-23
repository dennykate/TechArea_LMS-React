import { useDisclosure } from "@mantine/hooks";

import NavBar from "../navBar/NavBar";
import SideBar from "../sideBar/SideBar";

interface PropsType {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: PropsType) => {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <div className="flex items-start h-screen overflow-hidden">
      <SideBar opened={opened} />

      <div
        className={`h-full ${!opened ? "w-full" : "w-full"} transition-300 `}
      >
        <NavBar toggle={toggle} />

        <div className="h-[calc(100%-70px)] w-full overflow-y-auto bg-[#f5f5f5]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
