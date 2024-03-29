import SelectComponent from "@/components/inputs/SelectComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import {
  gradeData,
  sectionData,
} from "@/features/accounts/students/create/data";
import CourseCard from "./CourseCard";
import MyPagination from "@/components/common/MyPagination";

const StudentCourseFilterSearch = () => {
  return (
    <>
      <div
        className="w-full flex justify-between md:items-center items-end 
      gap-2 md:flex-row flex-col"
      >
        <div className="flex items-center gap-2">
          <SelectComponent
            data={gradeData}
            placeholder="Grade"
            searchInputClassName="sm:w-[150px] w-[100px]"
          />

          <SelectComponent
            data={sectionData}
            placeholder="Section"
            searchInputClassName="sm:w-[150px] w-[100px]"
          />
        </div>

        <div>
          <TextInputComponent
            placeholder="Search ..."
            inputClassName="sm:w-[350px] w-[230px]"
          />
        </div>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 sm:gap-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((dt) => (
          <CourseCard key={dt} />
        ))}
      </div>

      <div className="w-full flex justify-end">
        <MyPagination total={5} />
      </div>
    </>
  );
};

export default StudentCourseFilterSearch;
