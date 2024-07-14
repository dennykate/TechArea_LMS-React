import { Avatar, Tooltip, ActionIcon } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import { MdNotifications } from "react-icons/md";

interface NotificationItem {
  username: string;
  action: string;
  place: string;
  time: string;
  organization: string;
  avatarSrc: string;
  avatarAlt: string;
}

interface ItemType {
  item: NotificationItem;
}

interface NotiDataType {
  notiData: NotificationItem[];
}

const NotiCard: React.FC<ItemType> = ({ item }) => {
  return (
    <div className="noti-card flex justify-between items-center border-b py-3 px-4 last:border-b-0">
      <div className="flex gap-2">
        <Avatar
          src={item.avatarSrc}
          alt={item.avatarAlt}
          size="md"
          className="rounded-full"
        />
        <div className="space-y-[2px]">
          <p className="space-x-1">
            <span className="username font-semibold text-gray-800">
              {item.username}
            </span>
            <span className="action">{item.action}</span>
            <span className="place font-semibold text-gray-800">
              {item.place}
            </span>
          </p>
          <p className="text-xs flex gap-1 items-center">
            <span>{item.time}</span> <span className="text-base">&#183;</span>
            <span>{item.organization}</span>
          </p>
        </div>
      </div>
      <div className="w-2 h-2 bg-primary rounded-full" />
    </div>
  );
};

const NotificationComponent: React.FC<NotiDataType> = ({ notiData }) => {
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  return (
    <Tooltip label="Notifications">
      <ActionIcon
        onClick={() => setShowNotification((prev) => !prev)}
        className="relative"
      >
        <MdNotifications color="black" className="lg:text-xl text-lg" />
        {showNotification && (
          <div
            ref={notificationRef}
            className="w-[400px] bg-white border rounded-md shadow-md absolute top-7 right-0 z-10"
          >
            <p className="font-semibold text-lg text-gray-800 px-4 py-3 border-b">
              Notifications
            </p>
            <div className="overflow-y-auto">
              {notiData.map((item, i) => (
                <NotiCard key={i} item={item} />
              ))}
            </div>
          </div>
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default NotificationComponent;
