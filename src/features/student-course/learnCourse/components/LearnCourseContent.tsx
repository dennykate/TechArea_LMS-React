/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion } from "@mantine/core";

import Heading from "@/components/typography/Heading";
import LearnCourseAccordion from "./LearnCourseAccordion";
import React from "react";

interface PropsType {
  contents: any;
}

const LearnCourseContent: React.FC<PropsType> = ({ contents }) => {
  return (
    <>
      <div className="mt-6 space-y-4 px-2 mb-4">
        <Heading tag="h2">Course Contents</Heading>
      </div>

      <Accordion
        classNames={{
          content: "!px-0",
        }}
      >
        {contents?.map((content: any) => (
          <LearnCourseAccordion key={content?.id} data={content} />
        ))}
      </Accordion>
    </>
  );
};

export default LearnCourseContent;
