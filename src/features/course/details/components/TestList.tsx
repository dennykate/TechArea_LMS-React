/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { TableActions, TableComponent } from "@/components/table";
import useMutate from "@/hooks/useMutate";

interface PropsType {
  gradeId: string;
}

const TestList: React.FC<PropsType> = ({ gradeId }) => {
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
          <td className="m_td">
            <TableActions
              detailCb={() => navigate(`/quizzes/details/${element.id}`)}
              editCb={() => navigate(`/quizzes/edit/${element.id}`)}
              destroyCb={() =>
                onSubmit(`/quizzes/${element?.id}`, {}, "DELETE")
              }
            />
          </td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  return (
    <TableComponent
      pagination
      disableShadow
      rows={rows}
      checkboxCol={false}
      addNewRoute={`/quizzes/create?gradeId=${gradeId}`}
      title={"Test List"}
      headerClassName="!border-opacity-5"
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
      filter={`&filter[grade_id]=${gradeId}`}
      setData={setData}
    />
  );
};

export default TestList;
