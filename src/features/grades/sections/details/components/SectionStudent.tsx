/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "@mantine/core";
import { PiStudent } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import React, { useMemo, useState } from "react";

import useMutate from "@/hooks/useMutate";
import { TableActions, TableComponent } from "@/components/table";

interface PropsType {
  sectionId: string;
}

const SectionStudent: React.FC<PropsType> = ({ sectionId }) => {
  const navigate = useNavigate();
  const [onSubmit] = useMutate();

  const [data, setData] = useState<any>();

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">
            <Avatar
              size="lg"
              src="https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </td>
          <td className="m_td">{element?.name}</td>
          <td className="m_td">
            <a href={`tel:${element?.phone}`}>{element?.phone}</a>
          </td>
          <td className="m_td">{element?.gender}</td>
          <td className="m_td">{element?.date_of_birth}</td>
          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td">
            <TableActions
              detailCb={() =>
                navigate(
                  "/grades/details/1/sections/details/1/students/details/1"
                )
              }
              destroyCb={() => {}}
              editCb={() => {}}
            />
          </td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  return (
    <TableComponent
      checkboxCol={false}
      pagination
      hideAddNew
      Icon={PiStudent}
      rows={rows}
      title={"Student List"}
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
      filter={`&filter[section_id]=${sectionId}&filter[role_id]=1`}
      setData={setData}
    />
  );
};

export default SectionStudent;
