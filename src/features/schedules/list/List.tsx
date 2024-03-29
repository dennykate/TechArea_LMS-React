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
      [0]?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">1</td>
          <td className="m_td">Exam</td>
          <td className="m_td line-clamp-1 w-[200px]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi,
            quisquam nulla rerum ad dolor beatae? Repellendus natus ad autem,
            fugiat accusamus voluptatum quo officia fugit velit impedit dicta.
            Aut, commodi! Soluta, dolorum. Enim odio mollitia laborum voluptates
            fugit, blanditiis libero dolorum minus. Alias tempora, doloremque
            cumque consequuntur natus accusamus maxime neque soluta aperiam
            perferendis veniam aliquid sit totam rem asperiores.
          </td>
          <td className="m_td">01 Dec 2000 10:00 AM</td>
          <td className="m_td">01 Dec 2000 10:00 AM</td>
          <td className="m_td">exam</td>
          <td className="m_td">22 March 2024</td>
          <td className="m_td">22 March 2024</td>
          <td className="m_td">
            <TableActions
              detailCb={() => navigate("/schedules/details/1")}
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
          "Start Date",
          "End Date",
          "Type",
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
