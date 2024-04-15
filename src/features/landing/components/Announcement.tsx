/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react";

import { subTitle, title } from "../data";
import AnnouncementCard from "./AnnouncementCard";
import MoreButton from "./MoreButton";
import useQuery from "@/hooks/useQuery";

const Announcement = () => {
  const [data, setData] = useState<any>();

  useQuery(`/public/announcements?limit=4`, setData);
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
