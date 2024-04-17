import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaChevronRight } from "react-icons/fa";

import { MdOutlineClass } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
// import { MdLocationOn } from "react-icons/md";

interface PropsType {
  data: {
    name: string;
    subject: string;
    description: string;
    grade: string;
    section: string;
    thumbnail: string;
  };
}
const ClassCard = ({ data }: PropsType) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div
        onClick={open}
        className={`bg-white flex flex-col rounded-md relative lg:w-full sm:w-2/3 w-full mx-auto shadow-md
       hover:translate-y-[-2px] transition-all duration-300 ease-in-out hover:shadow-lg `}
      >
        <div className="w-full h-[250px] relative">
          <img
            src={data.thumbnail}
            alt="class-image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="sm:px-6 px-3 sm:py-6 py-3">
          <h3 className="font-poppins font-bold text-gray-800 text-2xl">
            {data?.name}
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: data?.description }}
            className="sm:text-base text-sm mt-2"
          />
          <div className="w-full mt-2 grid grid-cols-3">
            <div className=" flex items-center gap-1">
              <RiGraduationCapFill size={20} className="text-gray-800" />
              <p className="sm:text-base text-sm">{data?.subject}</p>
            </div>
            <div className="flex gap-1 items-center">
              <MdOutlineClass size={20} className="text-gray-800" />
              <p className="sm:text-base text-sm">{data?.grade}</p>
            </div>
            <div className="flex gap-1 items-center">
              <MdOutlineClass size={20} className="text-gray-800" />
              <p className="sm:text-base text-sm">{data?.section}</p>
            </div>
          </div>

          <div className="sm:my-3 my-2 sm:pb-3 pb-0 cursor-pointer group relative">
            <button className="font-bold text-[#FF564F] pb-2 relative">
              Enroll Now{" "}
              <FaChevronRight
                size={12}
                color="#FF564F"
                className="-translate-y-[1.5px] font-bold inline ml-7 group-hover:ml-0  transition-all duration-200 ease-in-out"
              />
            </button>
          </div>
        </div>
      </div>

      <Modal fullScreen opened={opened} onClose={close}>
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

export default ClassCard;
