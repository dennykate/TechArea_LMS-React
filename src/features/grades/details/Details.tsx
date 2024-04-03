/* eslint-disable @typescript-eslint/no-explicit-any */

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
import { MdOutlineClass, MdOutlineSubject } from "react-icons/md";

const List = () => {
  const [onSubmit] = useMutate();

  const [data, setData] = useState<any>();

  const navigate = useNavigate();

  const sections = useMemo(
    () =>
      [0, 1]?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">1</td>

          <td className="m_td">Section 1</td>

          <td className="m_td">Ma Ma</td>
          <td className="m_td">22 March 2024</td>
          <td className="m_td w-[80px]">
            <TableActions
              detailCb={() => navigate("/grades/details/1/sections/details/1")}
              destroyCb={() => {}}
              editCb={() => {}}
            />
          </td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  const subjects = useMemo(
    () =>
      [0, 1]?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">1</td>

          <td className="m_td">Myanmar</td>

          <td className="m_td">Ma Ma</td>
          <td className="m_td">22 March 2024</td>
          <td className="m_td w-[80px]">
            <TableActions destroyCb={() => {}} editCb={() => {}} />
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
          link: "/grades",
        },
        {
          title: "Grade Detail",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={MdOutlineClass}
        addNewRoute="/grades/details/1/sections/create"
        rows={sections}
        title={"Section List"}
        tableHeads={["Section", "Created By", "Created At"]}
        baseUrl="purchases"
        setData={setData}
      />
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={MdOutlineSubject}
        addNewRoute="/grades/details/1/subjects/create"
        rows={subjects}
        title={"Subject List"}
        tableHeads={["Subject", "Created By", "Created At"]}
        baseUrl="purchases"
        setData={setData}
      />
    </TableLayout>
  );
};

export default List;
