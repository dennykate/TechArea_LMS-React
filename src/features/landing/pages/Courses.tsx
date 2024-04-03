import MyPagination from "@/components/common/MyPagination";
import { Footer, Home } from "../components";
import CourseCard from "../components/CourseCard";
import { classData, subTitle, title } from "../data";

const Accouncements = () => {
  return (
    <>
      <Home />

      <div className="max-w-5xl mx-auto pb-20 sm:mt-20 pt-0 px-2">
        <div className="w-2/3 mx-auto text-center">
          <h6 className={subTitle}>Education For Everyone</h6>
          <h3 className={title}>Learn About Our Work Culture At Devschool</h3>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-8">
          {classData?.map((data, index) => (
            <CourseCard key={index} data={data} />
          ))}
          {classData?.map((data, index) => (
            <CourseCard key={index} data={data} />
          ))}
          {classData?.map((data, index) => (
            <CourseCard key={index} data={data} />
          ))}
        </div>

        <div className="w-full flex justify-end mt-12">
          <MyPagination total={5} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Accouncements;
