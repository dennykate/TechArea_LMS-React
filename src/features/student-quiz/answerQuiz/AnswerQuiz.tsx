/* eslint-disable @typescript-eslint/no-explicit-any */
import NavLayout from "@/components/layouts/NavLayout";
import AnswerQuizInformation from "./components/AnswerQuizInformation";
import QuizTimer from "./components/QuizTimer";
import QuizQuestion from "./components/QuizQuestion";
import QuizCount from "./components/QuizCount";
import useQuery from "@/hooks/useQuery";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "@mantine/core";

const AnswerQuiz = () => {
  const { quizId } = useParams();
  const [data, setData] = useState<any>();

  const { isLoading } = useQuery(`/quizzes/${quizId}`, setData);

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );

  return (
    <NavLayout>
      <div className="max-w-3xl mx-auto mb-8">
        <div className="w-full">
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full object-cover"
          />
        </div>

        <AnswerQuizInformation data={data} />

        <QuizQuestion questions={data?.questions} />
      </div>

      <div className="fixed sm:top-[42%] top-[45%] translate-y-[-50%] right-0 flex flex-col gap-2">
        <QuizCount />
        <QuizTimer />
      </div>
    </NavLayout>
  );
};

export default AnswerQuiz;
