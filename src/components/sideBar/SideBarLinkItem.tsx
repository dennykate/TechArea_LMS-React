import { useMemo } from "react";
import { Text } from "@mantine/core";
import { useLocation } from "react-router-dom";

interface PropsType {
  link: {
    label: string;
    link: string;
  };
}

const SideBarLinkItem = ({ link }: PropsType) => {
  const { pathname } = useLocation();

  const isActiveTab = useMemo(() => pathname === link.link, [pathname]);

  return (
    <Text
      component="a"
      className={`font-[400] block text-[14px] px-7 py-3 border-l border-black border-opacity-10
   ml-7 lg:text-sm text-xs ${
     isActiveTab ? "text-primary-500 " : "hover:bg-gray-100"
   }`}
      href={link.link}
    >
      {link.label}
    </Text>
  );
};

export default SideBarLinkItem;
