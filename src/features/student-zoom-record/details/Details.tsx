/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaLink } from "react-icons/fa6";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";

import DetailsLayout from "@/components/layouts/DetailsLayout";

import useQuery from "@/hooks/useQuery";
import Heading from "@/components/typography/Heading";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

import MyCarousel from "@/components/common/MyCarousel";

const Details = () => {
  const { zoomRecordId } = useParams();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(`/zoom-records/${zoomRecordId}`, setData);

  return (
    <DetailsLayout isLoading={isLoading} linkItems={[]}>
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
      </div>

      <div className="sm:mt-6 mt-3 space-y-3">
        <Heading tag="h2">Record Image</Heading>

        <MyCarousel slides={data?.attachments} />
      </div>
    </DetailsLayout>
  );
};

export default withPermissions(Details, banRoles.student_zoom_records);
