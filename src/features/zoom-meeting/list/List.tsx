/* eslint-disable @typescript-eslint/no-explicit-any */

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
import { BiLogoZoom } from "react-icons/bi";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const List = () => {
  const [onSubmit] = useMutate();

  const [data, setData] = useState<any>();

  const navigate = useNavigate();

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">{element?.agenda}</td>
          <td className="m_td">{element?.topic}</td>
          <td className="m_td">{element?.meeting_id}</td>
          <td className="m_td">{element?.grade}</td>
          <td className="m_td">{element?.section}</td>
          <td className="m_td">{element?.subject}</td>
          <td className="m_td">{element?.start_time}</td>
          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td">
            <TableActions
              detailCb={() => navigate(`/zoom-meetings/details/${element?.id}`)}
              destroyCb={() => onSubmit(`/zooms/${element?.id}`, {}, "DELETE")}
              editCb={() => navigate(`/zoom-meetings/edit/${element?.id}`)}
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
          "Class",
          "Subject",
          "Start Time",
          "Created By",
          "Created At",
        ]}
        baseUrl="zooms"
        setData={setData}
      />
    </TableLayout>
  );
};

export default withPermissions(List, banRoles.zoom_meetings);
