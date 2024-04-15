/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react";
// import { FaCaretRight } from "react-icons/fa";
import { subTitle, title } from "../data";
import EventCard from "./EventCard";
import MoreButton from "./MoreButton";
import useQuery from "@/hooks/useQuery";

const Event = () => {
  const [data, setData] = useState<any>();

  useQuery(`/public/events?limit=4`, setData);
  return (
    <div id="events" className="w-full pb-24">
      <div className="w-2/3 mx-auto text-center">
        <h6 className={subTitle}>Together We Can Create</h6>
        <h1 className={title}>Events For Our Students</h1>
      </div>

      <div className="my-10 w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 sm:px-10 px-2 mx-auto">
        {data?.map((item: any, index: number) => (
          <EventCard key={index} data={item} />
        ))}
      </div>

      <MoreButton to="/pub-events" label="Discover More Events" />
    </div>
  );
};

export default Event;
