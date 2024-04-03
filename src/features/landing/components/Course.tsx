import ClassCard from "./CourseCard";
import { classData, paragraph, subTitle, title } from "../data";
import MoreButton from "./MoreButton";

const Class = () => {
  return (
    <div id="courses" className="w-full sm:py-20  py-5">
      <div className="md:w-2/3 w-11/12 mx-auto text-center py-5 flex justify-center items-center flex-col">
        <h6 className={subTitle}>Education For Everyone</h6>
        <h3 className={title}>Learn About Our Work Culture At Devschool</h3>
        <p className={paragraph}>
          As a word from our heart, we love to dedicate for Kids the valuable
          things in Life. A great education is a must for a solid developments
          in both soul and mind for kids. We go with kids to play, learn, and
          grow better.
        </p>
      </div>

      <div className="mt-10 grid lg:grid-cols-3 grid-cols-1 gap-10 sm:px-10 px-2">
        {classData.map((data, index) => (
          <ClassCard data={data} key={index} />
        ))}
      </div>

      <MoreButton to="/courses" label="Discover More Courses" />
    </div>
  );
};

export default Class;
