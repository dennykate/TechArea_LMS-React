/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip, ActionIcon } from "@mantine/core";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { MdNotifications } from "react-icons/md";
import NotificationTabs from "./NotificationTabs";
import MyButton from "../buttons/MyButton";
import { Link } from "react-router-dom";
import useQuery from "@/hooks/useQuery";

interface NotificationItem {
  date: string;
  image: string;
  order: number;
  text: string;
  type: string;
  url: string;
}

interface ItemType {
  item: NotificationItem;
}

const NotiCard: React.FC<ItemType> = ({ item }) => {
  return (
    <div className="noti-card border-b py-3 px-4 last:border-b-0">
      <div className="flex justify-between items-center">
        <div className="space-y-1 w-full">
          <p className="">{item.text}.</p>
          <p className="text-xs">{item.date}</p>
        </div>
        <Link to={item.url} className="">
          <MyButton className="!h-7 !px-2">View</MyButton>
        </Link>
        {/* <div className="min-w-2 h-2 bg-primary rounded-full" /> */}
      </div>
    </div>
  );
};

const NotificationComponent = () => {
  const { data } = useQuery(`/notifications`);
  const [activeTab, setActiveTab] = useState("All");
  const [showNotification, setShowNotification] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  console.log(data);

  const counts = useMemo(() => {
    const testsCount = data?.tests?.length || 0;
    const homeworksCount = data?.home_works?.length || 0;
    const allCount = testsCount + homeworksCount;

    return { all: allCount, tests: testsCount, homeworks: homeworksCount };
  }, [data]);

  const notifications = useMemo(() => {
    let dt;
    switch (activeTab) {
      case "Tests":
        dt = data?.tests || [];
        break;
      case "Homeworks":
        dt = data?.home_works || [];
        break;
      case "All":
      default:
        dt = [...(data?.tests || []), ...(data?.home_works || [])];
        break;
    }

    // Sort the combined array by the 'order' property
    dt.sort((a: any, b: any) => a.order - b.order);

    return dt;
  }, [data, activeTab]);

  console.log("notifications", notifications);

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
          <div className="relative">
            <MdNotifications color="black" className="lg:text-xl text-lg" />
            {counts.all > 0 && (
              <span className=" absolute bottom-3 -right-3 ml-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {counts.all}
              </span>
            )}
          </div>
        </Tooltip>
      </ActionIcon>
      {showNotification && (
        <div
          ref={notificationRef}
          onClick={() => setShowNotification(true)}
          className="w-[450px] bg-white border rounded-md shadow-md absolute top-7 right-0 z-20"
        >
          <p className="font-semibold text-lg text-gray-800 px-4 pt-3">
            Notifications
          </p>

          <NotificationTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            counts={counts}
          />
          <div className="overflow-y-auto z-100">
            {notifications?.length > 0 ? (
              notifications.map((item: NotificationItem, i: number) => (
                <NotiCard key={i} item={item} />
              ))
            ) : (
              <div className="h-[300px] flex justify-center items-center">
                <p>No notification.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
