import useEncryptStorage from "@/hooks/use-encrypt-storage";
import { ActionIcon, Avatar, Tooltip } from "@mantine/core";
import { useMemo } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { RiArticleFill } from "react-icons/ri";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useMediaQuery } from "@mantine/hooks";

import { notiData } from "./data";
import NotificationComponent from "./NotificationComponent";

interface PropsType {
  toggle: () => void;
  Icon?: IconType;
  withShadow?: boolean;
  wrapperClassName?: string;
}

const NavBar = ({
  toggle,
  Icon = FaBarsStaggered,
  withShadow,
  wrapperClassName,
}: PropsType) => {
  const { get } = useEncryptStorage();
  const matches = useMediaQuery("(max-width: 600px");

  const userInfo = useMemo(() => JSON.parse(get("userInfo") as string), []);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggle();
  };
  return (
    <div
      className={twMerge(
        "w-full sm:h-[70px] h-[50px] bg-white flex items-center justify-between lg:px-4 px-1 border-b",
        withShadow && "shadow-md",
        wrapperClassName
      )}
    >
      <ActionIcon onClick={onClickHandler}>
        <Icon color="black" className="lg:text-lg text-base" />
      </ActionIcon>

      <div className="flex items-center lg:gap-4 gap-2 sm:flex-row flex-row-reverse  sm:pr-0 pr-1">
        <Link to="/profile">
          <div className="flex items-center gap-2 select-none">
            <p className="lg:text-base text-sm sm:block hidden">
              {userInfo?.name}
            </p>
            <Avatar
              src={userInfo?.profile}
              alt={userInfo?.name}
              size={matches ? "sm" : "md"}
              className="rounded-full"
            />
          </div>
        </Link>

        <NotificationComponent notiData={notiData} />

        <Tooltip label="News Feed">
          <Link to="/new-feed">
            <ActionIcon>
              <RiArticleFill color="black" className="lg:text-xl text-lg" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <Tooltip label="Chat">
          <Link to="/chat">
            <ActionIcon>
              <IoChatboxEllipsesSharp
                color="black"
                className="lg:text-xl text-lg"
              />
            </ActionIcon>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default NavBar;
