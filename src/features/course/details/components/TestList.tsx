/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { TableComponent } from "@/components/table";
import useMutate from "@/hooks/useMutate";

const TestList = () => {
  // const { courseId } = useParams();
  const navigate = useNavigate();
  const [onSubmit] = useMutate();
  const [data, setData] = useState<any>([]);

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">
            <img
              src={element?.image}
              className="h-[70px] w-[120px] object-cover rounded-sm"
            />
          </td>
          <td className="m_td">{element?.title} </td>
          <td className="m_td">{element?.grade}</td>
          <td className="m_td">{element?.section}</td>
          <td className="m_td">{element?.subject}</td>
          <td className="m_td">{element?.answer_limit}</td>
          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  return (
    <TableComponent
      actions={false}
      checkboxCol={false}
      pagination
      search={false}
      disableShadow
      disableTablePadding
      rows={rows}
      titleSection={false}
      tableHeads={[
        "Thumbnail",
        "Name",
        "Grade",
        "Class",
        "Subject",
        "Answer Count Limit",
        "Created By",
        "Created At",
      ]}
      baseUrl="quizzes"
      setData={setData}
    />
  );
};

export default TestList;
