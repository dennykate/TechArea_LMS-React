/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SelectComponent from "../inputs/SelectComponent";
import { twMerge } from "tailwind-merge";

interface PropsType {
  form?: any;
  usage?: string[];
  hideLabel?: boolean;
}

const GradeSectionSubject: React.FC<PropsType> = ({
  form,
  usage = ["subject", "grade", "section"],
  hideLabel = false,
}) => {
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
          data={[]}
          withAsterisk
          form={form}
          name="grade"
        />
      )}

      {usage.includes("section") && (
        <SelectComponent
          label={!hideLabel ? "Section" : ""}
          placeholder="Select section"
          data={[]}
          withAsterisk
          form={form}
          name="section"
        />
      )}

      {usage.includes("subject") && (
        <SelectComponent
          label={!hideLabel ? "Subject" : ""}
          placeholder="Select section"
          data={[]}
          withAsterisk
          form={form}
          name="subject"
        />
      )}
    </div>
  );
};

export default GradeSectionSubject;
