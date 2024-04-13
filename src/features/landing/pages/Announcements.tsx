/* eslint-disable @typescript-eslint/no-explicit-any */
import MyPagination from "@/components/common/MyPagination";
import { Footer, Home } from "../components";
import AnnouncementCard from "../components/AnnouncementCard";
import { subTitle, title } from "../data";
import { useState } from "react";
import useQuery from "@/hooks/useQuery";

const Accouncements = () => {
  const [data, setData] = useState<any>();

  useQuery(`/announcements`, setData);
  console.log(data);
  return (
    <>
      <Home />

      <div className="max-w-5xl mx-auto py-20 px-2">
        <div className="w-2/3 mx-auto text-center">
          <h6 className={subTitle}>Together We Can Create</h6>
          <h1 className={title}>Accouncements Updated Daily</h1>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
          {data?.map((item: any, index: number) => (
            <AnnouncementCard key={index} data={item} />
          ))}
        </div>

        <div className="w-full flex justify-end mt-12">
          <MyPagination total={5} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Accouncements;
