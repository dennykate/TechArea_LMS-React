import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import AssignmentInformation from "./components/AssignmentInformation";
import Heading from "@/components/typography/Heading";
import AssignmentStudentTable from "./components/AssignmentStudentTable";

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
        <Heading tag="h1">This is testing</Heading>

        <div className="sm:w-auto w-full flex justify-end">
          <div>
            <MyButton leftIcon={<IconPencilMinus size={16} />}>Edit</MyButton>
          </div>
        </div>
      </div>

      <div className="sm:mt-6 mt-3">
        <AssignmentInformation />
      </div>

      <div className="sm:mt-6 mt-3">
        <AssignmentStudentTable />
      </div>
    </DetailsLayout>
  );
};

export default Details;
