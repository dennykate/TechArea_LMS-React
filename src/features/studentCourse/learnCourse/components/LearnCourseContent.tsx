import { Accordion } from "@mantine/core";

import Heading from "@/components/typography/Heading";
import LearnCourseAccordion from "./LearnCourseAccordion";

const LearnCourseContent = () => {
  return (
    <div className="mt-6 space-y-4">
      <Heading tag="h2">Course Content</Heading>

      <p className="text-sm text-gray-500">
        32 Videos • 10 Images • 5 Youtube and 10 Text Contents
      </p>

      <Accordion>
        {[0, 1, 2, 3].map((key) => (
          <LearnCourseAccordion key={key} />
        ))}
      </Accordion>
    </div>
  );
};

export default LearnCourseContent;
