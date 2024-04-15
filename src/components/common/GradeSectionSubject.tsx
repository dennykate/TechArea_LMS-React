/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import SelectComponent from "../inputs/SelectComponent";
import { twMerge } from "tailwind-merge";
import useQuery from "@/hooks/useQuery";

interface PropsType {
  form: any;
  usage?: string[];
  hideLabel?: boolean;
  asterisk?: any;
}

const GradeSectionSubject: React.FC<PropsType> = ({
  form,
  usage = ["subject", "grade", "section"],
  hideLabel = false,
  asterisk = { grade: true, subject: true, section: true },
}) => {
  const [grades, setGrades] = useState<any>();
  const [sections, setSections] = useState<any>();
  const [subjects, setSubjects] = useState<any>();

  useQuery(`/grades`, setGrades);
  useQuery(
    `/sections?filter[grade_id]=${form.values?.grade_id}`,
    setSections,
    !usage.includes("section")
  );
  useQuery(
    `/subjects?filter[grade_id]=${form.values?.grade_id}`,
    setSubjects,
    !usage.includes("subject")
  );

  // useEffect(() => {
  //   form.setFieldValue("section_id", "");
  //   form.setFieldValue("subject_id", "");
  // }, [form.values?.grade_id]);

  return (
    <div
      className={twMerge(
        "grid grid-cols-1 gap-4",
        usage.length === 1 && "md:grid-cols-1",
        usage.length === 2 && "md:grid-cols-2",
        usage.length === 3 && "md:grid-cols-3"
      )}
    >
      {usage.includes("grade") && (
        <SelectComponent
          label={!hideLabel ? "Grade" : ""}
          placeholder="Select grade"
          data={
            grades?.map((grade: any) => ({
              label: grade?.name,
              value: grade?.id,
            })) || []
          }
          withAsterisk={asterisk?.grade}
          form={form}
          name="grade_id"
        />
      )}

      {usage.includes("section") && (
        <SelectComponent
          disabled={grades?.length == 0 || form.values.grade_id == ""}
          label={!hideLabel ? "Section" : ""}
          placeholder="Select section"
          data={
            sections?.map((section: any) => ({
              label: section?.name,
              value: section?.id,
            })) || []
          }
          withAsterisk={asterisk?.section}
          form={form}
          name="section_id"
        />
      )}

      {usage.includes("subject") && (
        <SelectComponent
          disabled={grades?.length == 0 || form.values.grade_id == ""}
          label={!hideLabel ? "Subject" : ""}
          placeholder="Select section"
          data={
            subjects?.map((subject: any) => ({
              label: subject?.name,
              value: subject?.id,
            })) || []
          }
          withAsterisk={asterisk?.subject}
          form={form}
          name="subject_id"
        />
      )}
    </div>
  );
};

export default GradeSectionSubject;
