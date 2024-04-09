/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SelectComponent from "../inputs/SelectComponent";

interface PropsType {
  form?: any;
  usage?: string[];
}

const GradeSectionSubject: React.FC<PropsType> = ({
  form,
  usage = ["subject", "grade", "section"],
}) => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
      {usage.includes("grade") && (
        <SelectComponent
          label="Grade"
          placeholder="Select grade"
          data={[]}
          withAsterisk
          form={form}
          name="grade"
        />
      )}

      {usage.includes("section") && (
        <SelectComponent
          label="Section"
          placeholder="Select section"
          data={[]}
          withAsterisk
          form={form}
          name="section"
        />
      )}

      {usage.includes("subject") && (
        <SelectComponent
          label="Subject"
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
