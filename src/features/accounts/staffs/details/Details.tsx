/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "@mantine/core";
import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import StaffInformation from "./components/StaffInformation";
import useQuery from "@/hooks/useQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const Details = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();

  const { isLoading: queryLoading } = useQuery(`users/${staffId}`, setData);

  return (
    <DetailsLayout
      isLoading={queryLoading}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Staff List", link: "/accounts/staffs" },
        { title: "Staff Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        <div className="flex items-center justify-center gap-4">
          <Avatar
            src={data?.profile}
            alt={data?.name}
            size="xl"
            radius={"md"}
          />

          <div className="space-y-[2px]">
            <p className="text-2xl font-[400]">{data?.name}</p>
            <p className="text-sm font-[300]">{data?.role} , </p>
          </div>
        </div>

        <div className="sm:w-auto w-full flex justify-end">
          <MyButton
            onClick={() => navigate(`/accounts/staffs/edit/${staffId}`)}
            leftIcon={<IconPencilMinus size={16} />}
          >
            Edit
          </MyButton>
        </div>
      </div>

      <div className="sm:mt-6 mt-3">
        <StaffInformation data={data} />
      </div>
    </DetailsLayout>
  );
};

export default Details;
