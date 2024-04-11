import Heading from "@/components/typography/Heading";
import { RingProgress } from "@mantine/core";
import { Link } from "react-router-dom";

const CourseCard = () => {
  return (
    <Link
      to={"/learn-course/basic-course"}
      className="w-full border border-black border-opacity-20 rounded shadow-sm overflow-hidden
       hover:translate-y-[-2px] hover:shadow-md transition-all duration-300 ease-in-out bg-white
       "
    >
      <div className="w-full sm:h-[150px] h-[130px] relative">
        <img
          src="https://i.postimg.cc/26gHzHpr/5a108056-a070-44ee-a123-1afd489077e0.jpg"
          alt="thumbnail"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-[-9px] right-[-6px] p-[4px] bg-white rounded-full">
          <RingProgress
            sections={[{ value: 40, color: "brand" }]}
            size={50}
            thickness={4}
            label={
              <p className="text-primary-500 text-center text-[10px]">40%</p>
            }
          />
        </div>
      </div>

      <div className="w-full space-y-2  sm:p-3 p-2">
        <Heading tag="h6" className="line-clamp-2 sm:!text-base !text-sm">
          Grade 10 Bio ( Chapter 10 )
        </Heading>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi hic
          id possimus laboriosam explicabo, ut, culpa accusamus iste suscipit
          recusandae maiores. Rem veniam consequatur ullam porro officia, cum
          quasi dolor.
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Tr. Thwe Thwe
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          Grade - 12 • Section - A
        </p>
        <p className="text-xs font-[300] text-gray-500 line-clamp-3">
          29 Lectures • 01 Dec 2000
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
