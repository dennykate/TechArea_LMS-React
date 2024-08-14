/* eslint-disable @typescript-eslint/no-explicit-any */

import { IconPencilMinus } from "@tabler/icons-react";
import { FaLink } from "react-icons/fa6";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";

import useQuery from "@/hooks/useQuery";
import Heading from "@/components/typography/Heading";
// import ModalImage from "@/components/ModalImage";
import MyCarousel from "@/components/common/MyCarousel";

const Details = () => {
  const navigate = useNavigate();
  const { zoomRecordId } = useParams();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(`/zoom-records/${zoomRecordId}`, setData);

  return (
    <DetailsLayout
      isLoading={isLoading}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Classroom Record List", link: "/zoom-records/list" },
        { title: "Classroom Record Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        <div className="sm:w-auto w-full flex gap-3 items-center justify-end">
          <MyButton
            onClick={() => navigate(`/zoom-records/edit/${zoomRecordId}`)}
            leftIcon={<IconPencilMinus size={16} />}
          >
            Edit
          </MyButton>
        </div>
      </div>

      <div className="sm:mt-6 mt-3 space-y-3">
        <div className="flex gap-5">
          <h2 className="sm:text-2xl text-lg font-semibold text-gray-500">
            {data?.title}
          </h2>

          <div className="flex gap-2 items-center">
            <MdEdit className="text-gray-500" />
            <p className="text-sm font-[300]">{data?.created_at}</p>
          </div>
        </div>
        <p className="font-light">
          <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </p>
        <p className="font-light">{data?.grade}</p>
        <p className="font-light">{data?.section}</p>
        <p className="font-light">{data?.subject}</p>
      </div>

      <div className="sm:mt-6 mt-3 space-y-3">
        <Heading tag="h2">Record Urls</Heading>

        <div className="space-y-2">
          {data?.urls?.map((dt: any) => (
            <Link
              to={dt?.url}
              target="_blank"
              className="flex items-center gap-2 cursor-pointer"
            >
              <p className="text-sm underline">{dt?.url}</p>

              <FaLink className="text-gray-700" size={16} />
            </Link>
          ))}
        </div>

        <div className="sm:mt-6 mt-3 space-y-3">
          <Heading tag="h2">Record Image</Heading>

          <MyCarousel slides={data?.attachments} />
        </div>
      </div>
    </DetailsLayout>
  );
};

export default Details;
