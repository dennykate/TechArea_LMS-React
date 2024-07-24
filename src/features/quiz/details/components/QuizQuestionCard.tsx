/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import { Badge, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencilMinus, IconTrash } from "@tabler/icons-react";
import EditQuizQuestion from "./EditQuizQuestion";
import React from "react";
import useMutate from "@/hooks/useMutate";
import alertActions from "@/utilities/alertActions";

interface PropsType {
  data: any;
}

const QuizQuestionCard: React.FC<PropsType> = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [onSubmit] = useMutate();

  return (
    <>
      <div
        className="w-full rounded-sm shadow-md p-4 border border-black border-opacity-10
    sm:relative"
      >
        <div className="flex gap-4">
          {data?.image && (
            <div className="sm:w-[200px] min-w-[100px] h-[100px]">
              <img
                src={data?.image}
                alt={data?.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-2 whitespace-nowrap">
            <p className="sm:text-base text-sm font-[500] ">
              Qus. {data?.title}
            </p>
            <p className="sm:text-base text-sm font-[500] ">
              Type. {data?.type}
            </p>
            <div className="flex items-center gap-2">
              <p className="sm:text-base text-sm font-[500] ">Ans.</p>

              <div className="flex items-center gap-2 flex-wrap">
                {data?.options?.map((option: any) => (
                  <Badge
                    key={option?.id}
                    size="sm"
                    color={option?.is_correct ? "teal" : "red"}
                  >
                    {option?.content}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="sm:absolute static sm:bottom-2 sm:right-2 flex items-center gap-2 sm:!mt-4
       sm:w-auto w-full justify-end"
        >
          <MyButton
            size="xs"
            variant="outline"
            color="red"
            leftIcon={<IconTrash size={16} />}
            onClick={() =>
              alertActions(
                () => onSubmit(`/quiz-questions/${data?.id}`, {}, "DELETE"),
                "Are You Sure To Delete"
              )
            }
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
        title="Edit Test Question"
        onClose={close}
        size="lg"
      >
        <EditQuizQuestion close={close} id={data?.id as string} />
      </Modal>
    </>
  );
};

export default QuizQuestionCard;
