/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Avatar } from "@mantine/core";
import { PiChalkboardTeacherLight } from "react-icons/pi";

import { TableActions, TableComponent } from "@/components/table";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";

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
              detailCb={() => navigate("/accounts/teachers/details/1")}
              destroyCb={() => {}}
              editCb={() => {}}
            />
          </td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  return (
    <TableLayout
      linkItems={[
        {
          title: "Dashboard",
          link: "/dashboard",
        },
        {
          title: "Teacher List",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={PiChalkboardTeacherLight}
        addNewRoute="/accounts/teachers/create"
        rows={rows}
        title={"Teacher List"}
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
  );
};

export default List;