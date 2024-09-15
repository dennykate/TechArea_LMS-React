/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { TableActions, TableComponent } from "@/components/table";
import useMutate from "@/hooks/useMutate";
// import useUserInfo from "@/hooks/use-user-info";
import checkPermission from "@/utilities/check-permission";
import MediaRenderer from "@/components/images/MediaRenderer";

interface PropsType {
  gradeId: string;
}

const TestList: React.FC<PropsType> = ({ gradeId }) => {
  // const { courseId } = useParams();
  const navigate = useNavigate();
  const [onSubmit] = useMutate();
  const [data, setData] = useState<any>([]);
  // const userInfo = useUserInfo();

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">
            {element?.medias?.length > 0 && (
              <MediaRenderer
                src={element?.medias[0]?.url}
                className="h-[70px] w-[120px] object-cover rounded-sm"
              />
            )}
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
              editCb={
                checkPermission(element?.created_by_id)
                  ? () => navigate(`/quizzes/edit/${element.id}`)
                  : undefined
              }
              destroyCb={
                checkPermission(element?.created_by_id)
                  ? () => onSubmit(`/quizzes/${element?.id}`, {}, "DELETE")
                  : undefined
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
        "Answer Limit",
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
