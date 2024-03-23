import { useMemo } from "react";
import { IconType } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface PropsType {
  link: {
    label: string;
    link: string;
    icon?: IconType;
  };
}

const SideBarLinkItem = ({ link }: PropsType) => {
  const { pathname } = useLocation();

  const isActiveTab = useMemo(() => pathname === link.link, [pathname]);

  const Icon = useMemo(() => link.icon, [link]);

  return (
    <Link
      className={twMerge(
        "font-[400] text-[14px] px-7 py-3 border-l border-black border-opacity-10 flex gap-2 ml-7 lg:text-sm text-xs ",
        isActiveTab ? "text-primary-500 " : "hover:bg-gray-100"
      )}
      to={link.link}
    >
      {Icon && <Icon className="text-lg" />}
      <span>{link.label}</span>
    </Link>
  );
};

export default SideBarLinkItem;
