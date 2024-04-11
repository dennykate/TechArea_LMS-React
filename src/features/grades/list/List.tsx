/* eslint-disable @typescript-eslint/no-explicit-any */

import { RiAdminLine } from "react-icons/ri";

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";

const List = () => {
  const navigate = useNavigate();
  const [onSubmit] = useMutate({ navigateBack: false });
  const [data, setData] = useState<any>();

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>

          <td className="m_td">{element.name}</td>

          <td className="m_td">{element.created_by}</td>
          <td className="m_td">{element.created_at}</td>
          <td className="m_td w-[80px]">
            <TableActions
              detailCb={() => navigate(`/grades/details/${element.id}`)}
              destroyCb={() => onSubmit(`/grades/${element.id}`, {}, "DELETE")}
              editCb={() => navigate(`/grades/edit/${element.id}`)}
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
        pagination
        Icon={RiAdminLine}
        addNewRoute="/grades/create"
        rows={rows}
        title={"Grade List"}
        tableHeads={["Name", "Created By", "Created At"]}
        baseUrl="grades"
        setData={setData}
      />
    </TableLayout>
  );
};

export default List;
