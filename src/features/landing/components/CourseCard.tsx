/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaCalendarAlt, FaChevronRight, FaUser } from "react-icons/fa";

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
    created_at: string;
    created_at_time: string;
    created_by: string;
    course_contents: any;
  };
}
const ClassCard = ({ data }: PropsType) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div
        onClick={open}
        className={`bg-white flex cursor-pointer flex-col rounded-md relative lg:w-full sm:w-2/3 w-full mx-auto shadow-md
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
            className="sm:text-base text-sm mt-2 line-clamp-3"
          />

          <div className="w-full my-4 grid grid-cols-3">
            <div className=" flex items-center gap-2">
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

          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              <FaCalendarAlt size={20} className="text-gray-800" />
              <p className="sm:text-base text-sm">{data?.created_by}</p>
            </div>

            <div className="flex gap-2 items-center">
              <FaUser size={20} className="text-gray-800" />
              <p className="sm:text-base text-sm">{data?.created_at}</p>
            </div>
          </div>

          <div className="mt-4 cursor-pointer group relative">
            <button className="font-bold text-[#FF564F] relative">
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
            src={data.thumbnail}
            alt="announcement-thumbnail"
            className="w-full h-[400px] object-cover"
          />

          <div className="mt-5 space-y-2">
            <p className=" font-poppins font-bold text-xl">{data?.name}</p>
            <div
              dangerouslySetInnerHTML={{ __html: data?.description }}
              className="font-sans text-base "
            />
            <p className="font-poppins text-sm  text-primary-500">
              Created By - {data?.created_by}
            </p>
            <p className="font-poppins text-sm  text-primary-500">
              Created At - {data?.created_at}
            </p>
            <div className="!mt-4 w-full">
              <p className=" font-poppins font-bold text-xl">Course Content</p>

              <div className="mt-4 flex w-full flex-col gap-[2px]">
                {data?.course_contents?.map((content: any, index: number) => (
                  <div
                    key={index}
                    className="py-4 px-2 w-full bg-primary-100 flex items-center justify-between"
                  >
                    <p className="text-sm">{content?.name}</p>
                    <p className="text-sm capitalize">
                      {content?.content_type} Course
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ClassCard;
