import MyButton from "@/components/buttons/MyButton";
import { Badge, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencilMinus, IconTrash } from "@tabler/icons-react";
import EditQuizQuestion from "./EditQuizQuestion";

const QuizQuestionCard = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div
        className="w-full rounded-sm shadow-md p-4 space-y-2 border border-black border-opacity-10
    relative "
      >
        <p className="sm:text-base text-sm font-[500] ">
          Qus. What is the largest country in the world ?
        </p>
        <p className="sm:text-base text-sm font-[500] ">
          Type. Multiple-Choice
        </p>
        <div className="flex items-center gap-2">
          <p className="sm:text-base text-sm font-[500] ">Ans.</p>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge size="sm" color="red">
              China
            </Badge>
            <Badge size="sm" color="red">
              Australia
            </Badge>
            <Badge size="sm" color="teal">
              Russia
            </Badge>
            <Badge size="sm" color="red">
              USA
            </Badge>
          </div>
        </div>

        <div
          className="sm:absolute sticky bottom-2 right-2 flex items-center gap-2 !mt-4 
       sm:w-auto w-full justify-end"
        >
          <MyButton
            size="xs"
            variant="outline"
            color="red"
            leftIcon={<IconTrash size={16} />}
          >
            Delete
          </MyButton>
          <MyButton
            onClick={open}
            size="xs"
            leftIcon={<IconPencilMinus size={16} />}
          >
            Edit
          </MyButton>
        </div>
      </div>

      <Modal
        opened={opened}
        title="Edit Quiz Question"
        onClose={close}
        size="lg"
      >
        <EditQuizQuestion close={close} />
      </Modal>
    </>
  );
};

export default QuizQuestionCard;
