/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import QuestionAnswerCard from "./QuestionAnswerCard";
import alertActions from "@/utilities/alertActions";
import React from "react";

interface PropsType {
  questions: any;
}

const QuizQuestion: React.FC<PropsType> = ({ questions }) => {
  const onSubmitHandler = () => {
    alertActions(() => {}, "Are you sure to submit your all answers");
  };

  return (
    <div className="mt-6 w-full px-2 border-t border-opacity-10 border-black">
      {questions?.map((question: any, index: number) => (
        <QuestionAnswerCard key={question?.id} data={question} index={index} />
      ))}

      <div className="flex justify-end items-center mt-6">
        <MyButton onClick={onSubmitHandler}>Submit My All Answers</MyButton>
      </div>
    </div>
  );
};

export default QuizQuestion;
