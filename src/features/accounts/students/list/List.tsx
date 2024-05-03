/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from "@mantine/core";
import { IoPeopleOutline } from "react-icons/io5";

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
import SelectComponent from "@/components/inputs/SelectComponent";
import useQuery from "@/hooks/useQuery";
import Heading from "@/components/typography/Heading";

const List = () => {
  const [onSubmit] = useMutate();

  const [data, setData] = useState<any>();
  const [gradeId, setGradeId] = useState<string>("");
  const [sectionId, setSectionId] = useState<string>("");

  const navigate = useNavigate();

  const rows = useMemo(
    () =>
      data?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>
          <td className="m_td">
            <Avatar size="lg" src={element?.profile} alt={element?.name} />
          </td>
          <td className="m_td">{element?.name}</td>
          <td className="m_td">{element?.student_id}</td>
          <td className="m_td">
            <a href={`tel:09964470356`}>{element?.phone}</a>
          </td>
          <td className="m_td">{element?.gender}</td>
          <td className="m_td">{element?.date_of_birth}</td>
          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td">
            <TableActions
              detailCb={() =>
                navigate(`/accounts/students/details/${element.id}`)
              }
              destroyCb={() => onSubmit(`/users/${element?.id}`, {}, "DELETE")}
              editCb={() => navigate(`/accounts/students/edit/${element.id}`)}
            />
          </td>
        </tr>
      )),
    [data, navigate, onSubmit]
  );

  const { data: grades } = useQuery(`/grades?limit=100`);
  const { data: sections } = useQuery(
    `/sections?limit=100&filter[grade_id]=${gradeId}`
  );

  return (
    <TableLayout
      linkItems={[
        {
          title: "Dashboard",
          link: "/dashboard",
        },
        {
          title: "Student List",
          link: "",
        },
      ]}
    >
      <div className="w-full bg-white rounded-md shadow-md border border-opacity-20 flex flex-col items-center gap-4 py-4">
        <Heading tag="h2">Please choose Grade & Section first!</Heading>

        <div className="w-full flex justify-center items-center gap-4">
          <SelectComponent
            label="Grade"
            placeholder="Select grade"
            data={grades?.map((grade: any) => ({
              value: grade?.id,
              label: grade?.name,
            }))}
            value={gradeId}
            onChange={(val: string) => setGradeId(val)}
          />

          <SelectComponent
            label="Section"
            placeholder="Select section"
            data={sections?.map((section: any) => ({
              value: section?.id,
              label: section?.name,
            }))}
            value={sectionId}
            onChange={(val: string) => setSectionId(val)}
          />
        </div>
      </div>

      {(gradeId || sectionId) && (
        <TableComponent
          checkboxCol={false}
          dateRangePicker
          pagination
          Icon={IoPeopleOutline}
          addNewRoute="/accounts/students/create"
          rows={rows}
          title={"Student List"}
          tableHeads={[
            "Profile",
            "Name",
            "Student ID",
            "Phone No",
            "Gender",
            "D.O.B",
            "Created By",
            "Created At",
          ]}
          baseUrl={`users`}
          filter={`&filter[role_id]=1&filter[grade_id]=${gradeId}${
            sectionId ? `&filter[section_id]=${sectionId}` : ""
          }`}
          setData={setData}
        />
      )}
    </TableLayout>
  );
};

export default List;
