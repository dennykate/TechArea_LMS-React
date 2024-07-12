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
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">{element?.title}</td>
          <td className="m_td">
            <div className="flex items-center max-w-[200px] ">
              <div
                className="line-clamp-1 truncate"
                dangerouslySetInnerHTML={{ __html: element?.description }}
              />
            </div>
          </td>
          <td className="m_td">{element?.grade}</td>
          <td className="m_td">{element?.section}</td>
          <td className="m_td">{element?.subject}</td>
          <td className="m_td">{element?.deadline}</td>
          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td">
            <TableActions
              detailCb={() => navigate(`/assignments/details/${element.id}`)}
              destroyCb={() =>
                onSubmit(`/assignments/${element?.id}`, {}, "DELETE")
              }
              editCb={() => navigate(`/assignments/edit/${element.id}`)}
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
          title: "Assignment List",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={RiAdminLine}
        addNewRoute="/assignments/create"
        rows={rows}
        title={"Assignment List"}
        tableHeads={[
          "Title",
          "Description",
          "Grade",
          "Class",
          "Subject",
          "Deadline",
          "Created By",
          "Created At",
        ]}
        baseUrl="assignments"
        setData={setData}
      />
    </TableLayout>
  );
};

export default List;
