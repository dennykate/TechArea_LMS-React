import { Avatar } from "@mantine/core";
import React from "react";
interface PropsType {
  item: {
    username: string;
    action: string;
    place: string;
    time: string;
    organization: string;
    avatarSrc: string;
    avatarAlt: string;
  };
}
const NotiCard = ({ item }: PropsType) => {
  const { username, action, place, time, organization, avatarAlt, avatarSrc } =
    item;
  return (
    <div className="noti-card  flex justify-between items-center border-b py-3 px-4 last:border-b-0">
      <div className="flex gap-2">
        <Avatar
          src={avatarSrc}
          alt={avatarAlt}
          size={"md"}
          className="rounded-full"
        />
        <div className="space-y-[2px]">
          <p className="space-x-1">
            <span className="username font-semibold text-gray-800">
              {username}
            </span>
            <span className="action">{action}</span>
            <span className="place font-semibold text-gray-800">{place}</span>
          </p>
          <p className="text-xs  flex gap-1 items-center">
            <span>{time}</span> <span className="text-base">&#183;</span>
            <span>{organization}</span>
          </p>
        </div>
      </div>
      <div className="w-2 h-2 bg-primary rounded-full" />
    </div>
  );
};

export default NotiCard;
