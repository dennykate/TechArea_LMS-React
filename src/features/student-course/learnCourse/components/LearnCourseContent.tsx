/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion } from "@mantine/core";

import Heading from "@/components/typography/Heading";
import LearnCourseAccordion from "./LearnCourseAccordion";
import React, { useEffect, useState } from "react";

interface PropsType {
  contents: any;
}

const LearnCourseContent: React.FC<PropsType> = ({ contents }) => {
  const [completeIndex, setCompleteIndex] = useState(0);

  useEffect(() => {
    contents?.forEach((content: any, index: number) => {
      if (content?.is_complete) setCompleteIndex(index + 1);
    });
  }, [contents]);

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
        {contents?.map((content: any, index: number) => (
          <LearnCourseAccordion
            key={content?.id}
            data={content}
            completeIndex={completeIndex}
            index={index}
          />
        ))}
      </Accordion>
    </>
  );
};

export default LearnCourseContent;
