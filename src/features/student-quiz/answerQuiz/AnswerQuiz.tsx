/* eslint-disable @typescript-eslint/no-explicit-any */
import NavLayout from "@/components/layouts/NavLayout";
import AnswerQuizInformation from "./components/AnswerQuizInformation";
import QuizTimer from "./components/QuizTimer";
import QuizQuestion from "./components/QuizQuestion";
import QuizCount from "./components/QuizCount";
import useQuery from "@/hooks/useQuery";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader, Modal } from "@mantine/core";
import useMutate from "@/hooks/useMutate";
import toast from "react-hot-toast";
import alertActions from "@/utilities/alertActions";
import MyButton from "@/components/buttons/MyButton";
import { useDisclosure } from "@mantine/hooks";
import QuizComplete from "./components/QuizComplete";

const AnswerQuiz = () => {
  const { quizId } = useParams();
  const [data, setData] = useState<any>();
  const [answers, setAnswers] = useState<any>([]);
  const [opened, { open, close }] = useDisclosure();

  const { isLoading } = useQuery(`/quizzes/${quizId}?key=asdffdsa`, setData);

  const [onSubmit, { isLoading: submitLoading }] = useMutate({
    navigateBack: false,
    callback: () => open(),
  });

  const onCompleteHandler = useCallback(() => {
    if (answers?.length < data?.questions?.length)
      return toast.error("Please make sure to complete all questions");

    const req = {
      quiz_id: quizId,
      answers,
    };

    return onSubmit(`/quiz-results`, req);
  }, [answers, data, quizId]);

  const onSubmitHandler = () => {
    alertActions(
      () => onCompleteHandler(),
      "Are you sure to submit your all answers"
    );
  };

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );

  return (
    <>
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

          <QuizQuestion questions={data?.questions} setAnswers={setAnswers} />

          <div className="flex justify-end items-center mt-6">
            <MyButton loading={submitLoading} onClick={onSubmitHandler}>
              Submit My All Answers
            </MyButton>
          </div>
        </div>

        <div className="fixed sm:top-[42%] top-[45%] translate-y-[-50%] right-0 flex flex-col gap-2">
          <QuizCount
            current={answers?.length ?? 0}
            total={data?.questions?.length}
          />
          <QuizTimer />
        </div>
      </NavLayout>

      <Modal opened={opened} onClose={close}>
        <QuizComplete />
      </Modal>
    </>
  );
};

export default AnswerQuiz;
