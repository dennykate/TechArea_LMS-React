import Heading from "@/components/typography/Heading";
import { Link } from "react-router-dom";

const QuizInformation = () => {
  return (
    <div className=" space-y-2 pb-6 border-b border-black border-opacity-20">
      <Heading tag="h2">Course Information</Heading>

      <div className="grid grid-cols-2 gap-4">
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p>Name</p>
          <p>Grammer Basic</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p>Grade</p>
          <p>Grade - 10</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p>Section</p>
          <p>Section - A</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p>Created By</p>
          <Link to="/" className="underline">
            Tr. Thwe Thwe
          </Link>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p>Created At</p>
          <p>22 Dec 2002</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p>Answered Students</p>
          <p>1,223</p>
        </div>
      </div>
    </div>
  );
};

export default QuizInformation;
