import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";

import ScheduleInformation from "./components/ScheduleInformation";

const Details = () => {
  return (
    <DetailsLayout
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Schedule List", link: "/schedules/list" },
        { title: "Schedule Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3 relative">
        <ScheduleInformation />

        <div className="absolute top-0 right-0">
          <div>
            <MyButton leftIcon={<IconPencilMinus size={16} />}>Edit</MyButton>
          </div>
        </div>
      </div>
    </DetailsLayout>
  );
};

export default Details;
