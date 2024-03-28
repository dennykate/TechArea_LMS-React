/* eslint-disable @typescript-eslint/no-explicit-any */

import { RiAdminLine } from "react-icons/ri";

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
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

          <td className="m_td">Grade 1</td>

          <td className="m_td">Ma Ma</td>
          <td className="m_td">22 March 2024</td>
          <td className="m_td w-[80px]">
            <TableActions
              detailCb={() => navigate("/grades/details/1")}
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
          title: "Grade List",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={RiAdminLine}
        addNewRoute="/grades/create"
        rows={rows}
        title={"Grade List"}
        tableHeads={["Name", "Created By", "Created At"]}
        baseUrl="purchases"
        setData={setData}
      />
    </TableLayout>
  );
};

export default List;
