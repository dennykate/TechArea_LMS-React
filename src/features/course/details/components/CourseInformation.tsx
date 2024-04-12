/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/typography/Heading";
import { Link } from "react-router-dom";

interface PropsType {
  data: any;
}

const CourseInformation: React.FC<PropsType> = ({ data }) => {
  return (
    <div className=" space-y-2 pb-6 ">
      <Heading tag="h2">Course Information</Heading>

      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Name - <span className="underline">{data?.name}</span>
      </p>
      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Grade - <span className="underline">{data?.grade}</span>
      </p>
      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Section - <span className="underline">{data?.section}</span>
      </p>
      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Created By -{" "}
        <Link to="/" className="underline">
          Tr. {data?.created_by}
        </Link>
      </p>
      <p className="sm:text-sm text-xs font-[300] text-black/70">
        Created At - <span className="underline">{data?.created_at}</span>
      </p>
    </div>
  );
};

export default CourseInformation;
