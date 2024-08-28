/* eslint-disable @typescript-eslint/no-explicit-any */

import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";

import { useState } from "react";
import useQuery from "@/hooks/useQuery";
import { useNavigate, useParams } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import EventMemory from "./components/EventMemory";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Details = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(`/events/${eventId}`, setData);

  return (
    <DetailsLayout
      isLoading={isLoading}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Event List", link: "/events/list" },
        { title: "Event Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        <div className="flex items-center justify-center gap-4">
          <img src={data?.image} alt={data?.title} className="w-[200px]" />
        </div>

        <div className="sm:w-auto w-full flex gap-3 items-center justify-end">
          <MyButton
            onClick={() => navigate(`/events/edit/${eventId}`)}
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
      </div>

      <EventMemory data={data?.galleries} />
    </DetailsLayout>
  );
};

export default withPermissions(Details, banRoles.events);
