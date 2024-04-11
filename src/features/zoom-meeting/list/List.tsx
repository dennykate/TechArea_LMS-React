/* eslint-disable @typescript-eslint/no-explicit-any */

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
import { BiLogoZoom } from "react-icons/bi";

const List = () => {
  const [onSubmit] = useMutate();

  const [data, setData] = useState<any>();

  const navigate = useNavigate();

  const rows = useMemo(
    () =>
      [0]?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">1</td>
          <td className="m_td">LMS</td>
          <td className="m_td">Nay Kaung Lr</td>
          <td className="m_td">43289492</td>
          <td className="m_td">Grade - 10</td>
          <td className="m_td">Section - A</td>
          <td className="m_td">Myanmar</td>
          <td className="m_td">01 Dec 2000 10:00 AM</td>
          <td className="m_td">Ma Ma Thwe</td>
          <td className="m_td">22 March 2024 10:00 AM</td>
          <td className="m_td">
            <TableActions
              detailCb={() => navigate("/zoom-meetings/details/1")}
              destroyCb={() => {}}
              editCb={() => navigate("/zoom-meetings/edit/1")}
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
          title: "Zoom Meeting List",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={BiLogoZoom}
        addNewRoute="/zoom-meetings/create"
        rows={rows}
        title={"Zoom Meetings List"}
        tableHeads={[
          "Agenda",
          "Topic",
          "Meeting Id",
          "Grade",
          "Section",
          "Subject",
          "Start Time",
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
