/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { TableComponent } from "@/components/table";
import useMutate from "@/hooks/useMutate";

const HomeworkList = () => {
  // const { courseId } = useParams();
  const navigate = useNavigate();
  const [onSubmit] = useMutate();
  const [data, setData] = useState<any>([]);

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">{element?.title}</td>
          <td className="m_td">
            <div className="flex items-center max-w-[200px] ">
              <div
                className="line-clamp-1 truncate"
                dangerouslySetInnerHTML={{ __html: element?.description }}
              />
            </div>
          </td>
          <td className="m_td">{element?.grade}</td>
          <td className="m_td">{element?.section}</td>
          <td className="m_td">{element?.subject}</td>
          <td className="m_td">{element?.deadline}</td>
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
        "Title",
        "Note",
        "Grade",
        "Class",
        "Subject",
        "Deadline",
        "Created By",
        "Created At",
      ]}
      baseUrl="assignments"
      setData={setData}
    />
  );
};

export default HomeworkList;
