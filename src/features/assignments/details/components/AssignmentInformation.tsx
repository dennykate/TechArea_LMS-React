/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/typography/Heading";
import { Link } from "react-router-dom";

interface PropsType {
  data: any;
}

const AssignmentInformation: React.FC<PropsType> = ({ data }) => {
  return (
    <div className=" space-y-2 pb-6 border-b border-black border-opacity-20">
      <Heading tag="h2">Homework Information</Heading>

      <div className="grid grid-cols-2 gap-4">
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p className="font-[500]">Grade</p>
          <p>{data?.grade}</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p className="font-[500]">Class</p>
          <p>{data?.section}</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p className="font-[500]">Subject</p>
          <p>{data?.subject}</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p className="font-[500]">Created By</p>
          <Link to="/" className="underline">
            Tr. {data?.created_by}
          </Link>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p className="font-[500]">Created At</p>
          <p>{data?.created_at}</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p className="font-[500]">Deadline</p>
          <p>{data?.deadline}</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p className="font-[500]">Marks</p>
          <p>{data?.marks}</p>
        </div>
        <div className="sm:text-sm text-xs font-[300] text-black/70 flex flex-col">
          <p className="font-[500]">Note</p>
          <div
            className="line-clamp-1 truncate"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default AssignmentInformation;
