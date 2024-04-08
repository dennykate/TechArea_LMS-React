/* eslint-disable @typescript-eslint/no-explicit-any */

import { TableActions, TableComponent } from "@/components/table";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import useMutate from "@/hooks/useMutate";
import TableLayout from "@/components/layouts/TableLayout";
import { MdOutlineClass, MdOutlineSubject } from "react-icons/md";

const List = () => {
  const { gradeId } = useParams();
  const [onSubmit] = useMutate();

  const [sectionData, setSectionData] = useState<any>();
  const [subjectData, setSubjectData] = useState<any>();

  const navigate = useNavigate();

  const sections = useMemo(
    () =>
      sectionData?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>

          <td className="m_td">{element?.name}</td>

          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td w-[80px]">
            <TableActions
              detailCb={() =>
                navigate(
                  `/grades/details/${gradeId}/sections/details/${element.id}`
                )
              }
              destroyCb={() =>
                onSubmit(`/sections/${element.id}`, {}, "DELETE")
              }
              editCb={() =>
                navigate(
                  `/grades/details/${gradeId}/sections/edit/${element.id}`
                )
              }
            />
          </td>
        </tr>
      )),
    [sectionData, navigate, onSubmit]
  );

  const subjects = useMemo(
    () =>
      subjectData?.map((element: any, i: number) => (
        <tr key={i}>
          <td className="m_td">{i + 1}</td>

          <td className="m_td">{element.name}</td>

          <td className="m_td">{element?.created_by}</td>
          <td className="m_td">{element?.created_at}</td>
          <td className="m_td w-[80px] ">
            <TableActions
              destroyCb={() =>
                onSubmit(`/subjects/${element.id}`, {}, "DELETE")
              }
              editCb={() =>
                navigate(
                  `/grades/details/${gradeId}/subjects/edit/${element.id}`
                )
              }
            />
          </td>
        </tr>
      )),
    [subjectData, navigate, onSubmit]
  );

  return (
    <TableLayout
      linkItems={[
        {
          title: "Dashboard",
          link: "/dashboard",
        },
        {
          title: "Grade List",
          link: "/grades",
        },
        {
          title: "Grade Detail",
          link: "",
        },
      ]}
    >
      <TableComponent
        checkboxCol={false}
        pagination
        Icon={MdOutlineClass}
        addNewRoute={`/grades/details/${gradeId}/sections/create`}
        rows={sections}
        title={"Section List"}
        tableHeads={["Section", "Created By", "Created At"]}
        baseUrl={`sections?filter[grade_id]=${gradeId}`}
        setData={setSectionData}
      />

      <TableComponent
        checkboxCol={false}
        pagination
        Icon={MdOutlineSubject}
        addNewRoute={`/grades/details/${gradeId}/subjects/create`}
        rows={subjects}
        title={"Subject List"}
        tableHeads={["Subject", "Created By", "Created At"]}
        baseUrl={`subjects?filter[grade_id]=${gradeId}`}
        setData={setSubjectData}
      />
    </TableLayout>
  );
};

export default List;
