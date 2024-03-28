/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "@mantine/core";
import { PiStudent } from "react-icons/pi";

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
import MyButton from "@/components/buttons/MyButton";
import { IconPencilMinus } from "@tabler/icons-react";

const List = () => {
  const [onSubmit] = useMutate();

  const [data, setData] = useState<any>();

  const navigate = useNavigate();

  const rows = useMemo(
    () =>
      [0, 1]?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">1</td>
          <td className="m_td">
            <Avatar
              size="lg"
              src="https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </td>
          <td className="m_td">Denny Kate</td>
          <td className="m_td">
            <a href={`tel:09964470356`}>09964470356</a>
          </td>
          <td className="m_td">Male</td>
          <td className="m_td">01 Dec 2000</td>
          <td className="m_td">Ma Ma</td>
          <td className="m_td">22 March 2024</td>
          <td className="m_td">
            <TableActions
              detailCb={() =>
                navigate(
                  "/grades/details/1/sections/details/1/students/details/1"
                )
              }
              destroyCb={() => {}}
              editCb={() => {}}
            />
          </td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  return (
    <>
      <TableLayout
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
            link: "/grades/details/1",
          },
          {
            title: "Section Details",
            link: "",
          },
        ]}
      >
        <div className="w-full border border-opacity-30 shadow-md rounded-md md:p-8 sm:p-4 p-3 bg-white mt-6">
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
                <p className="text-sm font-[300]">Admin , 123321</p>
              </div>
            </div>

            <div className="sm:w-auto w-full flex justify-end">
              <div>
                <MyButton leftIcon={<IconPencilMinus size={16} />}>
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
                      Total Students - <span className="underline">20</span>
                    </p>
                  </div>
                  <p className="sm:text-sm text-xs font-[300] text-black/70">
                    Teacher in charge -{" "}
                    <span className="underline">Daw Aye Aye Maw</span>
                  </p>
                  <p className="sm:text-sm text-xs font-[300] text-black/70">
                    Entrance date -{" "}
                    <span className="underline">22 Dec 2002</span>
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
                    <a className="underline" href={`tel:`}>
                      +959 964 470 356
                    </a>
                  </p>
                  <p className="sm:text-sm text-xs font-[300] text-black/70">
                    Email -{" "}
                    <a className="underline" href={`mailto:`}>
                      dennykate22@gmail.com
                    </a>
                  </p>
                  <p className="sm:text-sm text-xs font-[300] text-black/70">
                    Address -{" "}
                    <span className="">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Blanditiis vero natus corrupti perferendis esse non. At
                      impedit id qui, consectetur ut quod dolore necessitatibus,
                      dolorum optio provident vero commodi itaque.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TableComponent
          checkboxCol={false}
          dateRangePicker
          pagination
          Icon={PiStudent}
          addNewRoute="/grades/details/1/sections/details/1/students/create"
          rows={rows}
          title={"Student List"}
          tableHeads={[
            "Profile",
            "Name",
            "Phone No",
            "Gender",
            "D.O.B",
            "Created By",
            "Created At",
          ]}
          baseUrl="purchases"
          setData={setData}
        />
      </TableLayout>
    </>
  );
};

export default List;
