import { Modal } from "@mantine/core";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import config from "@/config";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropsType {
  data: any;
}

const EventCard: React.FC<PropsType> = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [fetchData, setFetchData] = useState<any>();

  const getEvents = useCallback(async () => {
    const res = await fetch(
      config.baseUrl + `/public/event-galleries/${data?.id}`
    );
    const eventGalleries = await res?.json();

    setFetchData(eventGalleries?.data);
  }, []);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <>
      <div
        className="shadow-md hover:-translate-y-3 hover:shadow-lg
     transition duration-200 ease-in-out relative group border border-black border-opacity-10"
        onClick={open}
      >
        <img
          src={
            data.image ??
            "https://i.postimg.cc/j5cskhjj/viber-image-2024-04-10-10-19-49-078.png"
          }
          alt="event"
          className="w-full h-[240px] object-cover"
        />
        <div className="p-5">

          <p className=" font-poppins font-bold text-xl">{data?.title}</p>

          <div

            dangerouslySetInnerHTML={{ __html: data?.description }}
            
            className="font-sans text-base mt-2 line-clamp-3"
          />
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 w-full h-[3px] bg-[#F4524C] lg:hidden block
       group-hover:block"
        ></div>
      </div>

      <Modal opened={opened} onClose={close} fullScreen>
        <div className="max-w-2xl mx-auto ">
          <img
            src={
              data.image ??
              "https://i.postimg.cc/j5cskhjj/viber-image-2024-04-10-10-19-49-078.png"
            }
            alt="announcement-thumbnail"
            className="w-full h-[400px] object-cover"
          />

          <div className="mt-5">
            <p className=" font-poppins font-bold text-xl">{data?.title}</p>
            <div
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className="font-sans text-base mt-2"
            />
            <p className="font-poppins text-sm mt-3 text-primary-500">
              Created By - {data?.created_by}
            </p>
            <p className="font-poppins text-sm mt-3 text-primary-500">
              Created At - {data?.created_at}
            </p>
          </div>

          <div className="w-full mt-8">
            <h1 className=" font-poppins font-bold text-xl mb-4">
              Our Memories
            </h1>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}
            >
              <Masonry gutter="10px">
                {fetchData?.map((photo: any, index: number) => (
                  <img src={photo?.image} alt="gallerires" key={index} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EventCard;
