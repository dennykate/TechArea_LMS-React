import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import VideoPlayer from "@/components/common/VideoPlayer";
import NavBar from "@/components/navBar/NavBar";
import LearnCourseInformation from "./components/LearnCourseInformation";
import LearnCourseContent from "./components/LearnCourseContent";

const LearnCourse = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar Icon={IoArrowBack} toggle={() => navigate(-1)} />

      <div className="max-w-2xl mx-auto">
        <div className="w-full">
          <VideoPlayer
            url="https://www.youtube.com/watch?v=Oextk-If8HQ"
            type="youtube"
          />
        </div>

        <LearnCourseInformation />

        <LearnCourseContent />
      </div>
    </>
  );
};

export default LearnCourse;
