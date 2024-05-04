/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/typography/Heading";
import { RingProgress } from "@mantine/core";
import { Link } from "react-router-dom";

interface PropsType {
  data: any;
}

const CourseCard: React.FC<PropsType> = ({ data }) => {
  return (
    <Link
      to={`/learn-course/${data?.id}`}
      className="w-full border border-black border-opacity-20 rounded shadow-sm overflow-hidden
       hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 ease-in-out bg-white
       "
    >
      <div className="w-full sm:h-[150px] h-[130px] relative">
        <img
          src={data?.thumbnail}
          alt={data?.name}
          className="w-full h-full object-cover"
        />

        {data?.complete_percentage > 0 && (
          <div className="absolute bottom-[-9px] right-[-6px] p-[4px] bg-white rounded-full">
            <RingProgress
              sections={[{ value: data?.complete_percentage, color: "teal" }]}
              size={60}
              thickness={4}
              label={
                <p className="text-primary-500 text-center text-[10px]">
                  {parseInt(data?.complete_percentage)}%
                </p>
              }
            />
          </div>
        )}
      </div>

      <div className="w-full space-y-2  sm:p-3 p-2">
        <Heading tag="h6" className="line-clamp-2 sm:!text-base !text-sm">
          {data?.name}
        </Heading>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Tr. {data?.created_by}
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          {data?.grade} • {data?.section}
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          {data?.created_at}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
