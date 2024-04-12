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

const AssignmentStudentTable = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const [onSubmit] = useMutate();
  const [data, setData] = useState<any>();
  const [opened, { open, close }] = useDisclosure(false);

  const rows = useMemo(
    () =>
      [0, 1]?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">1</td>
          <td className="m_td">
            <Avatar
              size="lg"
              src="https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=600"
            />
          </td>
          <td className="m_td">Denny Kate</td>

          <td className="m_td">Male</td>
          <td className="m_td">22 March 2024</td>
          <td className="m_td">
            <MyButton size="xs" onClick={open}>
              Rate
            </MyButton>
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
        tableHeads={["Profile", "Name", "Gender", "Created At"]}
        baseUrl={`assignment-reports/?assignment_id=${assignmentId}`}
        setData={setData}
      />

      <Modal opened={opened} onClose={close} title="Rate Student" centered>
        <RateStudent />
      </Modal>
    </>
  );
};

export default AssignmentStudentTable;
