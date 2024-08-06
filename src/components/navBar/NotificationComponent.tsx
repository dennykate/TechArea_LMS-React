import { Tooltip, ActionIcon } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import { MdNotifications } from "react-icons/md";
import NotificationTabs from "./NotificationTabs";
import MyButton from "../buttons/MyButton";
import { Link } from "react-router-dom";

interface NotificationItem {
  message: string;
  time: string;
  url: string;
}

interface ItemType {
  item: NotificationItem;
}

interface NotiDataType {
  notiData: NotificationItem[];
}

const NotiCard: React.FC<ItemType> = ({ item }) => {
  return (
    <div className="noti-card border-b py-3 px-4 last:border-b-0">
      <div className="flex justify-between items-center">
        <div className="space-y-1 w-full">
          <p>{item.message}.</p>
          <p className="text-xs">{item.time}</p>
        </div>
        <Link to={item.url} className="">
          <MyButton className="!h-7 !px-2">View</MyButton>
        </Link>
        {/* <div className="min-w-2 h-2 bg-primary rounded-full" /> */}
      </div>
    </div>
  );
};

const NotificationComponent: React.FC<NotiDataType> = ({ notiData }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [activeTab, setActiveTab] = useState("Inbox");
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
    <div className="relative">
      <ActionIcon onClick={() => setShowNotification((prev) => !prev)}>
        <Tooltip label="Notifications">
          <MdNotifications color="black" className="lg:text-xl text-lg" />
        </Tooltip>
      </ActionIcon>
      {showNotification && (
        <div
          ref={notificationRef}
          onClick={() => setShowNotification(true)}
          className="w-[400px] bg-white border rounded-md shadow-md absolute top-7 right-0 z-20"
        >
          <p className="font-semibold text-lg text-gray-800 px-4 pt-3">
            Notifications
          </p>
          <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="overflow-y-auto z-100">
            {notiData.map((item, i) => (
              <NotiCard key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
