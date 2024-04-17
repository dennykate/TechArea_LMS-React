/* eslint-disable @typescript-eslint/no-explicit-any */

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
import { HiOutlineSpeakerphone } from "react-icons/hi";

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
            <div className="h-[60px]">
              {element.image && (
                <img
                  src={element?.image}
                  alt={element.title}
                  className="w-[60px] h-[60px] object-cover rounded-md"
                />
              )}
            </div>
          </td>
          <td className="m_td">{element?.title}</td>
          <td className="m_td">
            <div dangerouslySetInnerHTML={{ __html: element?.description }} />
          </td>

          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td">
            <TableActions
              detailCb={() => navigate(`/announcements/details/${element.id}`)}
              destroyCb={() => onSubmit(`/announcements/${element.id}`, {}, "DELETE")}
              editCb={() => navigate(`/announcements/edit/${element.id}`)}
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
          title: "Announcement List",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        dateRangePicker
        pagination
        Icon={HiOutlineSpeakerphone}
        addNewRoute="/announcements/create"
        rows={rows}
        title={"Announcement List"}
        tableHeads={[
          "Image",
          "Title",
          "Description",
          "Created By",
          "Created At",
        ]}
        baseUrl={`announcements`}
        filter=""
        setData={setData}
      />
    </TableLayout>
  );
};

export default List;
