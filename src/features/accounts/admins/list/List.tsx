/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "@mantine/core";
import { IoPeopleOutline } from "react-icons/io5";

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
          <td className="m_td">
            <Avatar size="lg" src={element?.profile} alt={element?.name} />
          </td>
          <td className="m_td">{element?.name}</td>
          <td className="m_td">
            <a href={`tel:09964470356`}>{element?.phone}</a>
          </td>
          <td className="m_td">{element?.gender}</td>
          <td className="m_td">{element?.date_of_birth}</td>
          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td">
            <TableActions
              detailCb={() =>
                navigate(`/accounts/admins/details/${element.id}`)
              }
              destroyCb={() => {}}
              editCb={() => navigate(`/accounts/admins/edit/${element.id}`)}
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
          title: "Admin List",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={IoPeopleOutline}
        addNewRoute="/accounts/admins/create"
        rows={rows}
        title={"Admin List"}
        tableHeads={[
          "Profile",
          "Name",
          "Phone No",
          "Gender",
          "D.O.B",
          "Created By",
          "Created At",
        ]}
        baseUrl={`users`}
        filter="&filter[role_id]=3"
        setData={setData}
      />
    </TableLayout>
  );
};

export default List;
