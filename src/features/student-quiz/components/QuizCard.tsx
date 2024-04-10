/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/typography/Heading";
import { RingProgress } from "@mantine/core";
import { Link } from "react-router-dom";

interface PropsType {
  data: any;
}

const QuizCard: React.FC<PropsType> = ({ data }) => {
  return (
    <Link
      to={`/answer-quiz/${data?.id}`}
      className="w-full border border-black border-opacity-20 rounded shadow-sm overflow-hidden
       hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 ease-in-out bg-white
       "
    >
      <div className="w-full sm:h-[150px] h-[130px] relative">
        <img
          src={data?.image}
          alt={data?.title}
          className="w-full h-full object-cover"
        />

        {data?.is_answered && (
          <div className="absolute bottom-[-9px] right-[-6px] p-[4px] bg-white rounded-full">
            <RingProgress
              sections={[
                { value: data?.is_answered?.score_percentage, color: "brand" },
              ]}
              size={50}
              thickness={4}
              label={
                <p className="text-primary-500 text-center text-[10px]">
                  {data?.is_answered?.score_percentage}%
                </p>
              }
            />
          </div>
        )}
      </div>

      <div className="w-full space-y-2  sm:p-3 p-2">
        <Heading tag="h6" className="line-clamp-2 sm:!text-base !text-sm">
          {data?.title}
        </Heading>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          {data?.description}
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

export default QuizCard;
