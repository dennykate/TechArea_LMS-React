import { Avatar } from "@mantine/core";
import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import AdminInformation from "./components/AdminInformation";

const Details = () => {
  return (
    <DetailsLayout
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Admin List", link: "/accounts/admins/list" },
        { title: "Admin Details", link: "" },
      ]}
    >
      <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
        

        <div className="sm:w-auto w-full flex justify-end">
          <div>
            <MyButton leftIcon={<IconPencilMinus size={16} />}>Edit</MyButton>
          </div>
        </div>
      </div>

      <div className="sm:mt-6 mt-3">
        <AdminInformation />
      </div>
    </DetailsLayout>
  );
};

export default Details;
