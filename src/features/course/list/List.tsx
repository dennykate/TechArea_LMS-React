/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
import { MdOutlineMenuBook } from "react-icons/md";

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
            <img
              src="https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=600"
              className="h-[70px] w-[120px] object-cover rounded-sm"
            />
          </td>
          <td className="m_td">Grammer Basic </td>
          <td className="m_td">Grade 10</td>
          <td className="m_td">Section A</td>
          <td className="m_td">Ma Ma</td>
          <td className="m_td">22 March 2024</td>
          <td className="m_td">
            <TableActions
              detailCb={() => navigate("/courses/details/1")}
              editCb={() => navigate("/courses/edit/1")}
              destroyCb={() => {}}
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
          title: "Course List",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={MdOutlineMenuBook}
        addNewRoute="/courses/create"
        rows={rows}
        title={"Course List"}
        tableHeads={[
          "Thumbnail",
          "Name",
          "Grade",
          "Section",
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
