/* eslint-disable @typescript-eslint/no-explicit-any */

import { RiAdminLine } from "react-icons/ri";

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
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
          <td className="m_td">{element.title}</td>
          <td className="m_td ">
            <div className="w-[200px] flex items-center line-clamp-1">
              {element.description}
            </div>
          </td>
          <td className="m_td">{element.role}</td>
          <td className="m_td">{element.start_date}</td>
          <td className="m_td">{element.end_date}</td>
          <td className="m_td">{element.type}</td>
          <td className="m_td">{element.created_by}</td>
          <td className="m_td">{element.created_at}</td>
          <td className="m_td">
            <TableActions
              detailCb={() => navigate(`/schedules/details/${element.id}`)}
              destroyCb={() =>
                onSubmit(
                  `/academic-calendar-events/${element.id}`,
                  {},
                  "DELETE"
                )
              }
              editCb={() => navigate(`/schedules/edit/${element.id}`)}
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
          title: "Schedule List",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={RiAdminLine}
        addNewRoute="/schedules/create"
        rows={rows}
        title={"Schedule List"}
        tableHeads={[
          "Title",
          "Description",
          "For",
          "Start Date",
          "End Date",
          "Type",
          "Created By",
          "Created At",
        ]}
        baseUrl="academic-calendar-events"
        setData={setData}
      />
    </TableLayout>
  );
};

export default withPermissions(List, banRoles.schedules);
