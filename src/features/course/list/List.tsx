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
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">
            <img
              src={element?.thumbnail}
              alt={element?.name}
              className="h-[70px] w-[120px] object-cover rounded-sm"
            />
          </td>
          <td className="m_td">{element?.name} </td>
          <td className="m_td">{element?.grade}</td>
          <td className="m_td">{element?.section}</td>
          <td className="m_td">{element?.subject}</td>
          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td">
            <TableActions
              detailCb={() => navigate(`/courses/details/${element?.id}`)}
              editCb={() => navigate(`/courses/edit/${element?.id}`)}
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
          "Subject",
          "Created By",
          "Created At",
        ]}
        baseUrl="courses"
        setData={setData}
      />
    </TableLayout>
  );
};

export default List;
