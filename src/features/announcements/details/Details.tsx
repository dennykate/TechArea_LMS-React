/* eslint-disable @typescript-eslint/no-explicit-any */

import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";

import { useState } from "react";
import useQuery from "@/hooks/useQuery";
import { useNavigate, useParams } from "react-router-dom";

import { MdEdit } from "react-icons/md";

const Details = () => {
  const navigate = useNavigate();
  const { announcementId } = useParams();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(`/announcements/${announcementId}`, setData);

  return (
    <DetailsLayout
      isLoading={isLoading}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Announcement List", link: "/announcements/list" },
        { title: "Announcement Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        <div className="flex items-center justify-center gap-4">
          <img src={data?.image} alt={data?.title} className="w-[200px]" />
        </div>

        <div className="sm:w-auto w-full flex gap-3 items-center justify-end">
          <MyButton
            onClick={() => navigate(`/announcements/edit/${announcementId}`)}
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
            <MdEdit className="text-gray-500"/>
            <p className="text-sm font-[300]">{data?.created_at}</p>
          </div>
        </div>
        <p className="font-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sunt sit
          fugit possimus voluptates asperiores labore illum at! Dolores animi
          maxime, aut corrupti veritatis autem quibusdam incidunt sunt nisi
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea
          nesciunt consequatur inventore officiis iure voluptates labore
          perspiciatis quis quod nulla ipsam, id quae ducimus vel magni dolor
          iusto odit?
        </p>
      </div>
    </DetailsLayout>
  );
};

export default Details;
