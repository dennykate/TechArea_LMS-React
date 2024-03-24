import { Avatar } from "@mantine/core";
import { IconPencilMinus } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import StudentCourses from "./components/StudentCourses";
import StudentInformation from "./components/StudentInformation";

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
        <div className="flex items-center justify-center gap-4">
          <Avatar
            src="https://mira.bootlab.io/static/img/avatars/avatar-1.jpg"
            alt="Ma Ma"
            size="xl"
            radius={"md"}
          />

          <div className="space-y-[2px]">
            <p className="text-2xl font-[400]">Ma Ma</p>
            <p className="text-sm font-[300]">Student , 123321</p>
          </div>
        </div>

        <div className="sm:w-auto w-full flex justify-end">
          <div>
            <MyButton leftIcon={<IconPencilMinus size={16} />}>Edit</MyButton>
          </div>
        </div>
      </div>

      <div className="sm:mt-6 mt-3">
        <StudentInformation />
      </div>

      <div className="sm:mt-6 mt-3">
        <StudentCourses />
      </div>
    </DetailsLayout>
  );
};

export default Details;
