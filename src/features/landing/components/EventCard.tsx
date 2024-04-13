import { Modal } from "@mantine/core";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { useDisclosure } from "@mantine/hooks";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropsType {
  data: any;
}

const photos = [
  "https://i.postimg.cc/C1pdRzdR/meta-preview.jpg",
  "https://i.postimg.cc/DZcfm6tN/design-online-course-thumbnail-udemy-course-cover-image.webp",
  "https://i.postimg.cc/15dmgfjy/5a108056-a070-44ee-a123-1afd489077e0.jpg",
  "https://i.postimg.cc/W4LsnxVK/1600w-w-K95f3-XNRa-M.webp",
  "https://i.postimg.cc/KzQFmzTS/ccessful-600nw-521875054.webp",
  "https://i.postimg.cc/RCs98W9w/istockphoto-1459390094-170667a.webp",
];

const AnnouncementCard: React.FC<PropsType> = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);

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

          <p className=" font-sans text-base mt-2">
            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 w-full h-[3px] bg-[#F4524C] lg:hidden block
       group-hover:block"
        ></div>
      </div>

      <Modal opened={opened} onClose={close} fullScreen>
        <div className="max-w-2xl mx-auto ">
          <img
            src="https://i.postimg.cc/vH311NbV/against-studio-background-1258-89269.jpg"
            alt="announcement-thumbnail"
            className="w-full h-[300px] object-cover"
          />

          <div className="mt-5">
            <h1 className=" font-poppins font-bold text-xl">{data.title}</h1>
            <p className=" font-sans text-base mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis
              fugiat eligendi repudiandae quidem doloribus ad maxime vitae.
              Suscipit a dignissimos asperiores repellat voluptatibus maxime
              autem ullam rerum quibusdam, tempore nulla!
            </p>
            <p className="font-poppins text-sm mt-3 text-primary-500">
              Created By - Thwe Thwe
            </p>
            <p className="font-poppins text-sm mt-3 text-primary-500">
              Created At - Dec 17, 2020
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
                {photos?.map((photo, index) => (
                  <img src={photo} alt="gallerires" key={index} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AnnouncementCard;
