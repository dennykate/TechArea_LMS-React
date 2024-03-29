import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import NavBar from "@/components/navBar/NavBar";
import LearnCourseInformation from "./components/LearnCourseInformation";
import LearnCourseContent from "./components/LearnCourseContent";
import Footer from "@/components/footers/Footer";

const LearnCourse = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar Icon={IoArrowBack} toggle={() => navigate(-1)} />

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

      <Footer />
    </>
  );
};

export default LearnCourse;
