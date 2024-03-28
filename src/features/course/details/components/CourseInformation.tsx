import Heading from "@/components/typography/Heading";
import { Link } from "react-router-dom";

const CourseInformation = () => {
  return (
    <div className=" space-y-2 pb-6 border-b border-black border-opacity-20">
      <Heading tag="h2">Course Information</Heading>

      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Name - <span className="underline">Grammer Basic</span>
      </p>
      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Grade - <span className="underline">Grade 10</span>
      </p>
      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Section - <span className="underline">Section A</span>
      </p>
      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Created By -{" "}
        <Link to="/" className="underline">
          Tr. Thwe Thwe
        </Link>
      </p>
      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Created At - <span className="underline">22 Dec 2002</span>
      </p>
      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Enroll Students - <span className="underline">1023 students</span>
      </p>
    </div>
  );
};

export default CourseInformation;
