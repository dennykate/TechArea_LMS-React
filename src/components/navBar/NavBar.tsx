import useEncryptStorage from "@/hooks/use-encrypt-storage";
import { ActionIcon, Avatar } from "@mantine/core";
import { useMemo } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

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

      <div className="flex items-center lg:gap-4 gap-2">
        <button className="flex items-center gap-1">
          <p className="lg:text-base text-sm ">{userInfo?.name}</p>
          <Avatar
            src={userInfo?.profile}
            alt={userInfo?.name}
            size="md"
            className="rounded-full"
          />
        </button>

        <Link to="/profile">
          <ActionIcon>
            <IoSettings color="black" className="lg:text-xl text-lg" />
          </ActionIcon>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
