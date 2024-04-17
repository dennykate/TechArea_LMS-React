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
     transition duration-200 ease-in-out relative group border border-gray-800 border-opacity-10"
        onClick={open}
      >
        <img
          src={
            data.image ??
            "https://i.postimg.cc/j5cskhjj/viber-image-2024-04-10-10-19-49-078.png"
          }
          alt="daily-update"
          className="w-full h-[240px] object-cover"
        />
        <div className="p-5">
          <h1 className=" font-poppins font-bold text-xl text-gray-800">
            {data.title}
          </h1>

          <div
            dangerouslySetInnerHTML={{ __html: data?.description }}
            className="font-sans text-base mt-2"
          />

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
        </div>
      </Modal>
    </>
  );
};

export default AnnouncementCard;