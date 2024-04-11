import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropsType {
  data: any;
}

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
          src={data.thumbnail}
          alt="daily-update"
          className="w-full h-[240px] object-cover"
        />
        <div className="p-5">
          <h1 className=" font-poppins font-bold text-xl">{data.title}</h1>
          <p className=" font-sans text-base mt-2">{data.paragraph}</p>
          <p className="font-poppins text-sm mt-2 text-primary-500">
            Created At - Dec 17, 2020
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
        </div>
      </Modal>
    </>
  );
};

export default AnnouncementCard;
