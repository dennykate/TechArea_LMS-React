import NavLayout from "@/components/layouts/NavLayout";
import AnswerQuizInformation from "./components/AnswerQuizInformation";
import QuizTimer from "./components/QuizTimer";
import QuizQuestion from "./components/QuizQuestion";
import QuizCount from "./components/QuizCount";

const AnswerQuiz = () => {
  return (
    <NavLayout>
      <div className="max-w-3xl mx-auto mb-8">
        <div className="w-full">
          <img
            src="https://i.postimg.cc/6qrGKPhX/design-online-course-thumbnail-udemy-course-cover-image.webp"
            alt="thumbnail"
            className="w-full object-cover"
          />
        </div>

        <AnswerQuizInformation />

        <QuizQuestion />
      </div>

      <div className="fixed top-[50%] translate-y-[-50%] right-0">
        <QuizTimer />
      </div>

      <div className="fixed sm:top-[42%] top-[45%] translate-y-[-50%] right-0">
        <QuizCount />
      </div>
    </NavLayout>
  );
};

export default AnswerQuiz;
