/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";

import ScheduleInformation from "./components/ScheduleInformation";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import useQuery from "@/hooks/useQuery";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Details = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(
    `/academic-calendar-events/${scheduleId}`,
    setData
  );
  return (
    <DetailsLayout
      isLoading={isLoading}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Schedule List", link: "/calendar" },
        { title: "Schedule Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3 relative">
        <ScheduleInformation data={data} />

        <div className="absolute top-0 right-0">
          <div>
            <MyButton
              onClick={() => navigate(`/schedules/edit/${scheduleId}`)}
              leftIcon={<IconPencilMinus size={16} />}
            >
              Edit
            </MyButton>
          </div>
        </div>
      </div>
    </DetailsLayout>
  );
};

export default withPermissions(Details, banRoles.schedules);
