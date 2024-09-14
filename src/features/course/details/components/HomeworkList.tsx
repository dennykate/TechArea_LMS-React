/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { TableActions, TableComponent } from "@/components/table";
import useMutate from "@/hooks/useMutate";
import useUserInfo from "@/hooks/use-user-info";

interface PropsType {
  gradeId: string;
  lessonId: string;
}

const HomeworkList: React.FC<PropsType> = ({ gradeId, lessonId }) => {
  // const { courseId } = useParams();
  const navigate = useNavigate();
  const [onSubmit] = useMutate();
  const [data, setData] = useState<any>([]);
  const userInfo = useUserInfo();

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
          <td className="m_td">
            <TableActions
              detailCb={() =>
                navigate(
                  `/assignments/details/${element.id}?lesson_id=${lessonId}`
                )
              }
              destroyCb={
                userInfo.id === element?.created_by_id
                  ? () => onSubmit(`/assignments/${element?.id}`, {}, "DELETE")
                  : undefined
              }
              editCb={
                userInfo.id === element?.created_by_id
                  ? () =>
                      navigate(
                        `/assignments/edit/${element.id}?lesson_id=${lessonId}`
                      )
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
      addNewRoute={`/assignments/create?gradeId=${gradeId}`}
      title={"Homework List"}
      headerClassName="!border-opacity-5"
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
      filter={`&filter[grade_id]=${gradeId}`}
      setData={setData}
    />
  );
};

export default HomeworkList;
