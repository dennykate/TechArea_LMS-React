/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Avatar } from "@mantine/core";

import { TableComponent } from "@/components/table";
import useMutate from "@/hooks/useMutate";

interface PropsType {
  title: string;
  baseURL: string;
}

const TopStudents: React.FC<PropsType> = ({title,baseURL}) => {
  const navigate = useNavigate();
  const [onSubmit] = useMutate();
  const [data, setData] = useState<any>([]);

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">
            <Avatar size="lg" src={element?.profile} alt={element?.name} />
          </td>
          <td className="m_td">{element?.name}</td>
          <td className="m_td">{element?.gender}</td>
          <td className="m_td">{element?.grade?.name}</td>
          <td className="m_td">{element?.section?.name}</td>
          <td className="m_td">{element?.total_score} </td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  return (
    <div className="space-y-2">
      <p className="font-semibold sm:text-[20px] text-base text-gray-500">
        {title}
      </p>
      <TableComponent
        actions={false}
        checkboxCol={false}
        pagination={false}
        search={false}
        disableShadow
        disableTablePadding
        rows={rows}
        titleSection={false}
        tableHeads={[
          "Profile",
          "Name",
          "Gender",
          "Grade",
          "Section",
          "Total Marks",
        ]}
        baseUrl={baseURL}
        setData={setData}
        limit={false}
      />
    </div>
  );
};

export default TopStudents;
