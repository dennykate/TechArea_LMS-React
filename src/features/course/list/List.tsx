/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
import { MdOutlineMenuBook } from "react-icons/md";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
import useUserInfo from "@/hooks/use-user-info";

const List = () => {
  const [onSubmit] = useMutate();

  const [data, setData] = useState<any>();
  const userInfo = useUserInfo();

  const navigate = useNavigate();

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">
            <img
              src={
                element?.thumbnail ||
                (element?.attachments?.length > 0 &&
                  element?.attachments[0]?.url)
              }
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
              editCb={
                userInfo.id === element?.created_by_id
                  ? () => navigate(`/courses/edit/${element?.id}`)
                  : undefined
              }
              destroyCb={
                userInfo.id === element?.created_by_id
                  ? () => onSubmit(`/courses/${element?.id}`, {}, "DELETE")
                  : undefined
              }
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
          title: "Lesson List",
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
        title={"Lesson List"}
        tableHeads={[
          "Thumbnail",
          "Name",
          "Grade",
          "Class",
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

export default withPermissions(List, banRoles.courses);
