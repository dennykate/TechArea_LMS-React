/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-irregular-whitespace */
import React, { useCallback, useEffect, useState } from "react";

import { subTitle, title } from "../data";
import AnnouncementCard from "./AnnouncementCard";
import MoreButton from "./MoreButton";
import config from "@/config";

const Announcement = () => {
  const [data, setData] = useState<any>();

  const getAnnouncements = useCallback(async () => {
    const res = await fetch(config.baseUrl + "/public/announcements?limit=4");
    const announcements = await res?.json();

    setData(announcements?.data);
  }, []);

  useEffect(() => {
    getAnnouncements();
  }, [getAnnouncements]);

  return (
    <div id="announcements" className="w-full py-24">
      <div className="w-2/3 mx-auto text-center">
        <h6 className={subTitle}>Together We Can Create</h6>
        <h1 className={title}>Accouncements Updated Daily</h1>
      </div>

      <div
        className="my-10 w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 
      gap-8 sm:px-10 px-2 mx-auto"
      >
        {data?.map((item: any, index: number) => (
          <AnnouncementCard key={index} data={item} />
        ))}
      </div>

      <MoreButton to="/pub-announcements" label="Discover More Announcements" />
    </div>
  );
};

export default Announcement;
