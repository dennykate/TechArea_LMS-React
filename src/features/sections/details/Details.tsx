/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate, useParams } from "react-router-dom";
import MyButton from "@/components/buttons/MyButton";
import { IconPencilMinus } from "@tabler/icons-react";
import useQuery from "@/hooks/useQuery";
import SectionStudent from "./SectionStudent";
import { useState } from "react";
import DetailsLayout from "@/components/layouts/DetailsLayout";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import AddTeacher from "./AddTeacher";

const List = () => {
  const { sectionId, gradeId } = useParams();
  const [data, setData] = useState<any>();
  const [opened, { open, close }] = useDisclosure();

  const navigate = useNavigate();

  useQuery(`/sections/${sectionId}`, setData);

  return (
    <>
      <DetailsLayout
        linkItems={[
          {
            title: "Dashboard",
            link: "/dashboard",
          },
          {
            title: "Grade List",
            link: "/grades",
          },
          {
            title: "Grade Details",
            link: `/grades/details/${gradeId}`,
          },
          {
            title: "Section Details",
            link: "",
          },
        ]}
      >
        <div className="w-full flex justify-between sm:items-end items-start sm:flex-row flex-col gap-3">
          <div className="flex items-center justify-center gap-4">
            <div className="space-y-[2px]">
              <p className="text-2xl font-[400]">{data?.name}</p>
              <p className="text-sm font-[300]">
                {data?.grade} , {data?.created_at}
              </p>
            </div>
          </div>

          <div className="sm:w-auto w-full flex justify-end">
            <div>
              <MyButton
                onClick={() =>
                  navigate(
                    `/grades/details/${gradeId}/sections/edit/${sectionId}`
                  )
                }
                leftIcon={<IconPencilMinus size={16} />}
              >
                Edit
              </MyButton>
            </div>
          </div>
        </div>

        <div className="sm:mt-6 mt-3">
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
            <div className="">
              <h2 className="sm:text-xl text-lg font-[400]">
                Section Information
              </h2>

              <div className="space-y-2 mt-2">
                <div className="grid grid-cols-3">
                  <p className="sm:text-sm text-xs font-[300] text-black/70  whitespace-nowrap">
                    Total Students -{" "}
                    <span className="">{data?.total_students}</span>
                  </p>
                </div>
                <p className="sm:text-sm text-xs font-[300] text-black/70">
                  Teacher in charge -{" "}
                  <span className="underline">{data?.teacher?.name}</span>
                </p>
                <p className="sm:text-sm text-xs font-[300] text-black/70">
                  Entrance date -{" "}
                  <span className="underline">{data?.teacher?.created_at}</span>
                </p>
              </div>
            </div>

            <div className="md:col-span-2 sm:col-span-2 col-span-1">
              <h2 className="sm:text-xl text-lg font-[400]">
                Teacher Information
              </h2>

              <div className="space-y-2 mt-2">
                <p className="sm:text-sm text-xs font-[300] text-black/70">
                  Phone number -{" "}
                  <a className="underline" href={`tel:${data?.teacher?.phone}`}>
                    {data?.teacher?.phone}
                  </a>
                </p>
                <p className="sm:text-sm text-xs font-[300] text-black/70">
                  Email -{" "}
                  <a
                    className="underline"
                    href={`mailto:${data?.teacher?.email}`}
                  >
                    {data?.teacher?.email}
                  </a>
                </p>
                <p className="sm:text-sm text-xs font-[300] text-black/70">
                  Address - <span className="">{data?.teacher?.address}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10 mt-6">
            <h2 className="sm:text-xl text-lg font-[400]">Set Class Teacher</h2>

            <MyButton onClick={open}>Set Teacher</MyButton>
          </div>
        </div>
      </DetailsLayout>

      <div className="mt-2 md:px-8 sm:px-4 px-2 ">
        <SectionStudent sectionId={sectionId as string} />
      </div>

      <Modal title="Class Teacher" onClose={close} opened={opened} centered>
        <AddTeacher
          sectionId={sectionId as string}
          close={close}
          oldTeacherId={data?.teacher?.id as string}
        />
      </Modal>
    </>
  );
};

export default List;
