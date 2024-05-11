/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Avatar } from "@mantine/core";

import { TableComponent } from "@/components/table";
import useMutate from "@/hooks/useMutate";

const AnswerStudents = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [onSubmit] = useMutate();
  const [data, setData] = useState<any>();

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

          <td className="m_td">{element?.grade}</td>

          <td className="m_td">{element?.section}</td>

          <td className="m_td">{element?.total_score}</td>
          
          <td className="m_td">{element?.total_score_percentage}</td>
          <td className="m_td">{element?.lastest_answer_at}</td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  return (
    <TableComponent
      actions={false}
      checkboxCol={false}
      pagination
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
        "Total Score",
        "Total Score Percentage",
        "Lastest Answered At",
      ]}
      baseUrl={`quizzes/${quizId}/answer-students`}
      setData={setData}
    />
  );
};

export default AnswerStudents;
