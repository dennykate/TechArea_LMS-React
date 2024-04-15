/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { Avatar, Modal } from "@mantine/core";

import { TableComponent } from "@/components/table";
import useMutate from "@/hooks/useMutate";
import Heading from "@/components/typography/Heading";
import MyButton from "@/components/buttons/MyButton";
import { useDisclosure } from "@mantine/hooks";
import RateStudent from "./RateStudent";
import alertActions from "@/utilities/alertActions";

interface PropsType {
  assignmentMarks: number;
}

const AssignmentStudentTable: React.FC<PropsType> = ({ assignmentMarks }) => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [onSubmit] = useMutate({ navigateBack: false });
  const [data, setData] = useState<any>();
  const [opened, { open, close }] = useDisclosure(false);
  const [report, setReport] = useState<any>();

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">
            <Avatar
              size="lg"
              src={element?.user?.profile}
              alt={element?.user?.name}
            />
          </td>
          <td className="m_td">{element?.user?.name}</td>
          <td className="m_td">{element?.marks || 0}</td>
          <td className="m_td">{element?.user?.gender}</td>
          <td className="m_td">{element?.user?.grade}</td>
          <td className="m_td">{element?.user?.section}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td">
            <div className="min-w-[200px] flex items-center gap-1">
              <MyButton
                size="xs"
                onClick={() => {
                  open();
                  setReport(element);
                }}
              >
                Rate
              </MyButton>
              <MyButton
                size="xs"
                color="red"
                variant="filled"
                onClick={() => {
                  alertActions(
                    () =>
                      onSubmit(
                        `/assignment-reports/${element?.id}`,
                        {},
                        "DELETE"
                      ),
                    "Are your sure ?"
                  );
                }}
              >
                Remove
              </MyButton>
            </div>
          </td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  return (
    <>
      <Heading tag="h2" className="mb-4">
        Submitted Students
      </Heading>

      <TableComponent
        checkboxCol={false}
        pagination
        disableShadow
        disableTablePadding
        rows={rows}
        titleSection={false}
        tableHeads={[
          "Profile",
          "Name",
          "Marks",
          "Gender",
          "Grade",
          "Section",
          "Created At",
        ]}
        baseUrl={`assignment-reports`}
        filter={`&assignment_id=${assignmentId}`}
        setData={setData}
      />

      <Modal opened={opened} onClose={close} title="Rate Student" centered>
        <RateStudent
          onClose={close}
          assignmentMarks={assignmentMarks}
          report={report}
        />
      </Modal>
    </>
  );
};

export default AssignmentStudentTable;
