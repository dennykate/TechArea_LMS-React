/* eslint-disable @typescript-eslint/no-explicit-any */
import NavLayout from "@/components/layouts/NavLayout";
import AnswerQuizInformation from "./components/AnswerQuizInformation";
import QuizTimer from "./components/QuizTimer";
import QuizQuestion from "./components/QuizQuestion";
import QuizCount from "./components/QuizCount";
import useQuery from "@/hooks/useQuery";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Loader, Modal } from "@mantine/core";
import useMutate from "@/hooks/useMutate";
import toast from "react-hot-toast";
import alertActions from "@/utilities/alertActions";
import MyButton from "@/components/buttons/MyButton";
import { useDisclosure } from "@mantine/hooks";
import QuizComplete from "./components/QuizComplete";
import { IconAlertCircle } from "@tabler/icons-react";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
import MyCarousel from "@/components/common/MyCarousel";

const AnswerQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();
  const [answers, setAnswers] = useState<any>([]);
  const [opened, { open, close }] = useDisclosure();
  const [resData, setResData] = useState<any>();

  const { isLoading } = useQuery(`/quizzes/${quizId}?key=asdffdsa`, setData);

  const [onSubmit, { isLoading: submitLoading }] = useMutate({
    navigateBack: false,
    callback: (data) => {
      open();
      setResData(data);
    },
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

  const isLimitExceeded = useMemo(
    () => data?.answer_count >= data?.answer_limit,
    [data]
  );

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
          <div className="!w-full">
            <img
              src={data?.medias[0].url}
              alt={data?.title}
              className="w-full object-cover h-[350px] mt-5"
            />
          </div>

          <AnswerQuizInformation data={data} />

          <hr className="my-5" />
          {data?.medias?.length > 0 && (
            <div className="mt-5 flex flex-col gap-2 sm:text-sm text-xs font-[300] text-black/70">
              <p className="text-lg font-medium text-black mb-3">
                Support Attachments
              </p>
              <MyCarousel slides={data?.medias} />
            </div>
          )}

          {isLimitExceeded && (
            <div className="my-4 px-2">
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="Notice!"
                color="red"
              >
                Your answer limit is already exceeded.
              </Alert>
            </div>
          )}

          <QuizQuestion questions={data?.questions} setAnswers={setAnswers} />

          <div className="flex justify-end items-center mt-6">
            <MyButton
              disabled={isLimitExceeded}
              loading={submitLoading}
              onClick={onSubmitHandler}
            >
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

      <Modal
        opened={opened}
        onClose={() => {
          close();
          navigate(-1);
        }}
        centered
      >
        <QuizComplete data={resData} questionCount={data?.questions?.length} />
      </Modal>
    </>
  );
};

export default withPermissions(AnswerQuiz, banRoles.student_quizzes);
