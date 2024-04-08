import MyButton from "@/components/buttons/MyButton";
import QuestionAnswerCard from "./QuestionAnswerCard";
import alertActions from "@/utilities/alertActions";

const QuizQuestion = () => {
  const onSubmitHandler = () => {
    alertActions(() => {}, "Are you sure to submit your all answers");
  };

  return (
    <div className="mt-6 w-full px-2 border-t border-opacity-10 border-black">
      <QuestionAnswerCard />
      <QuestionAnswerCard />

      <div className="flex justify-end items-center mt-6">
        <MyButton onClick={onSubmitHandler}>Submit My All Answers</MyButton>
      </div>
    </div>
  );
};

export default QuizQuestion;
