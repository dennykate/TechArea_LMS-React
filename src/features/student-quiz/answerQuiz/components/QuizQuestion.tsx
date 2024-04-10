/* eslint-disable @typescript-eslint/no-explicit-any */
import QuestionAnswerCard from "./QuestionAnswerCard";
import React from "react";

interface PropsType {
  questions: any;
  setAnswers?: any;
}

const QuizQuestion: React.FC<PropsType> = ({ questions, setAnswers }) => {
  const onAnswerHandler = (val: string, question: any) => {
    setAnswers((prev: any) => {
      const isExist = prev?.find(
        (answer: any) => answer?.question_id == question?.id
      );

      if (!isExist)
        return [...prev, { question_id: question?.id, option_id: val }];

      return prev?.map((answer: any) => {
        if (answer?.question_id == question?.id) {
          answer["option_id"] = val;
        }
        return answer;
      });
    });
  };

  return (
    <div className="mt-6 w-full px-2 border-t border-opacity-10 border-black">
      {questions?.map((question: any, index: number) => (
        <QuestionAnswerCard
          onAnswer={(val: string) => onAnswerHandler(val, question)}
          key={question?.id}
          data={question}
          index={index}
        />
      ))}
    </div>
  );
};

export default QuizQuestion;
