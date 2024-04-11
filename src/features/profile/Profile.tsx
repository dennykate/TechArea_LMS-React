import MyButton from "@/components/buttons/MyButton";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import { Avatar } from "@mantine/core";
import { IconPencilMinus } from "@tabler/icons-react";
import React from "react";

const Profile = () => {
  return (
    <DetailsLayout
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Profile", link: "" },
      ]}
    >
      <div className="">
        <h2 className="sm:text-xl text-lg font-semibold">My Profile</h2>
        <div className="w-full bg-white mt-6 relative">
          <div className="flex items-center gap-5 pb-6 pl-5 border-b">
            <Avatar
              src="https://mira.bootlab.io/static/img/avatars/avatar-1.jpg"
              alt="Ma Ma"
              size="xl"
              className="rounded-full"
            />

            <div className="space-y-[6px]">
              <p className="text-xl font-medium leading-none">Ma Ma</p>
              <p className="text-base font-medium text-gray-400 leading-none">
                Teacher
              </p>
              <p className="text-base font-medium text-gray-400 leading-none">
                Lorem
              </p>
            </div>
          </div>
          <div className="mt-6 pl-5 pb-4">
            <p className="text-xl font-medium leading-none mb-6">
              Personal Information
            </p>
            <div className="flex  mb-6">
              <div className="space-y-3 w-2/5">
                <p className="text-base font-medium text-gray-400 leading-none">
                  Name
                </p>
                <p className="text-base font-normal text-gray-400 leading-none">
                  Ma Ma
                </p>
              </div>
              <div className="space-y-3 w-3/5">
                <p className="text-base font-medium text-gray-400 leading-none">
                  Date of Birth
                </p>
                <p className="text-base font-normal text-gray-400 leading-none">
                  1-12-2000
                </p>
              </div>
            </div>
            <div className="flex mb-6">
              <div className="space-y-3 w-2/5">
                <p className="text-base font-medium text-gray-400 leading-none">
                  Email Address
                </p>
                <p className="text-base font-normal text-gray-400 leading-none">
                  tth@gmail.com
                </p>
              </div>
              <div className="space-y-3 w-3/5">
                <p className="text-base font-medium text-gray-400 leading-none">
                  Phone Number
                </p>
                <p className="text-base font-normal text-gray-400 leading-none">
                  +95987766433
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="space-y-3 w-2/5">
                <p className="text-base font-medium text-gray-400 leading-none">
                  Gender
                </p>
                <p className="text-base font-normal text-gray-400 leading-none">
                  Female
                </p>
              </div>
              <div className="space-y-3 w-3/5">
                <p className="text-base font-medium text-gray-400 leading-none">
                  Address
                </p>
                <p className="text-base font-normal text-gray-400 leading-5">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Veritatis, dolorum fugit? Soluta autem dolores placeat
                  mollitia repudiandae quas labore. Itaque temporibus culpa et
                  enim ratione dolores sit iusto aspernatur nam?
                </p>
              </div>
            </div>
          </div>
          <div className="absolute right-2 top-2">
            <MyButton leftIcon={<IconPencilMinus size={16} />}>Edit</MyButton>
          </div>
        </div>
      </div>
    </DetailsLayout>
  );
};

export default Profile;
