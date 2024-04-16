import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { LinkType } from "./type";
import useUserInfo from "@/hooks/use-user-info";

interface PropsType {
  link: LinkType;
}

const SideBarLinkItem = ({ link }: PropsType) => {
  const { pathname } = useLocation();
  const userInfo = useUserInfo();

  const isActiveTab = useMemo(() => pathname.includes(link.path), [pathname]);
  const isBanUser = useMemo(
    () => link?.banRoles?.includes(userInfo?.role_id),
    [link]
  );

  const Icon = useMemo(() => link.icon, [link]);

  if (isBanUser) return <></>;

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
