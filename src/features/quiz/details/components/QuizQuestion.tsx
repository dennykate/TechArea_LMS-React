import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { IconBookUpload } from "@tabler/icons-react";

import MyButton from "@/components/buttons/MyButton";
import Heading from "@/components/typography/Heading";
import MyPagination from "@/components/common/MyPagination";
import QuizQuestionCard from "./QuizQuestionCard";
import CreateQuizQuestion from "./CreateQuizQuestion";

const QuizQuestion = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <Heading tag="h2">Course Contents</Heading>

        <MyButton onClick={open} leftIcon={<IconBookUpload size={16} />}>
          Create New
        </MyButton>
      </div>

      <div className="grid grid-cols-1 mt-4 gap-4">
        <QuizQuestionCard />
      </div>

      <div className="mt-6 flex justify-end">
        <MyPagination total={5} />
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Create Quiz Question"
        centered
        size="lg"
     
      >
        <CreateQuizQuestion close={close} />
      </Modal>
    </>
  );
};

export default QuizQuestion;
