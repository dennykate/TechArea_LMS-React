/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { IconBookUpload } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import Heading from "@/components/typography/Heading";
import QuizQuestionCard from "./QuizQuestionCard";
import CreateQuizQuestion from "./CreateQuizQuestion";

interface PropsType {
  questions: any[];
}

const QuizQuestion: React.FC<PropsType> = ({ questions }) => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Heading tag="h2">Test Questions</Heading>

        <MyButton onClick={open} leftIcon={<IconBookUpload size={16} />}>
          Create New
        </MyButton>
      </div>

      <div className="grid grid-cols-1 mt-4 gap-4">
        {questions?.map((question) => (
          <QuizQuestionCard key={question.id} data={question} />
        ))}
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Create Test Question"
        centered
        size="lg"
      >
        <CreateQuizQuestion close={close} />
      </Modal>
    </>
  );
};

export default QuizQuestion;
