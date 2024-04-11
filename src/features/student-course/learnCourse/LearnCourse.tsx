import LearnCourseInformation from "./components/LearnCourseInformation";
import LearnCourseContent from "./components/LearnCourseContent";
import NavLayout from "@/components/layouts/NavLayout";

const LearnCourse = () => {
  return (
    <NavLayout>
      <div className="max-w-2xl mx-auto mb-8">
        <div className="w-full">
          <img
            src="https://i.postimg.cc/6qrGKPhX/design-online-course-thumbnail-udemy-course-cover-image.webp"
            alt="thumbnail"
            className="w-full object-cover"
          />
        </div>

        <LearnCourseInformation />

        <LearnCourseContent />
      </div>
    </NavLayout>
  );
};

export default LearnCourse;
