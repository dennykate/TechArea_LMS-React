import { RingProgress, Text } from "@mantine/core";
import { IoCalendarOutline } from "react-icons/io5";

const StudentCourseCard = () => {
  return (
    <div
      className="sm:h-[200px] h-auto rounded-md overflow-hidden flex sm:items-center items-start sm:gap-8 gap-0
     border shadow-md sm:flex-row flex-col"
    >
      <div className="sm:w-[200px] w-full sm:h-full h-[150px]">
        <img
          src="https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="course"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-2 sm:p-0 p-3 ">
        <h6 className="sm:text-lg text-base font-[400]">
          How to make a website
        </h6>
        <p className="text-xs font-[300] text-black/80">
          Grade 9 , Section - A
        </p>
        <div className="flex items-center gap-2">
          <IoCalendarOutline size={14} />
          <p className="text-xs font-[300] text-black/80">
            01 Dec 2000 , 12:00AM
          </p>
        </div>
        <div className="flex items-center gap-2 !mt-4">
          <RingProgress
            size={60}
            thickness={4}
            roundCaps
            sections={[{ value: 40, color: "green" }]}
            label={
              <Text color="green" weight={700} align="center" size="xs">
                40%
              </Text>
            }
          />
          <p className="sm:text-base text-sm font-[300] text-black/80">
            Complete
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseCard;
