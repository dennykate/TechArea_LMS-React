/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Alert, Chip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import FormLayout from "@/components/layouts/FormLayout";
import SelectComponent from "@/components/inputs/SelectComponent";
import Heading from "@/components/typography/Heading";
import MyButton from "@/components/buttons/MyButton";
import toast from "react-hot-toast";
import FileUpload from "@/components/inputs/FileUpload";
import useMutate from "@/hooks/useMutate";
import { useParams } from "react-router-dom";

interface PropsType {
  close: () => void;
}

const CreateQuizQuestion: React.FC<PropsType> = ({ close }) => {
  const { quizId } = useParams();
  const [file, setFile] = useState<File | undefined>();

  const form = useForm({
    initialValues: {
      title: "",
      type: "true/false",
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) => (value.length > 0 ? null : "Title is required"),
    },
  });

  const [onSubmit, { isLoading }] = useMutate({
    callback: () => close(),
  });
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [optionalAnswer, setOptionalAnswer] = useState<string>("");

  const newOptionCreateHandler = () => {
    if (options.length >= 6)
      return toast.error("Sorry, maximun answers limit exceeded");

    setOptions((prev: string[]) => {
      return [...prev, optionalAnswer];
    });

    setOptionalAnswer("");
  };

  const onSubmitHandler = (values: any) => {
    if (!correctAnswer) return toast.error("Please select one correct answer");

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formData.append("image", file as File);
    formData.append("quiz_id", quizId as string);

    let optionsWithCorrectAns: any[] = [];

    if (form.values.type == "true/false") {
      optionsWithCorrectAns = ["True", "False"].map((option) => ({
        content: option,
        is_correct: option == correctAnswer,
      }));
    } else {
      optionsWithCorrectAns = options?.map((option) => ({
        content: option,
        is_correct: option == correctAnswer,
      }));
    }

    formData.append("options", JSON.stringify(optionsWithCorrectAns));

    onSubmit("/quiz-questions", formData, "POST", true);
  };

  useEffect(() => setCorrectAnswer(""), [form.values.type]);

  return (
    <FormLayout
      wrapperClassName="sm:px-2 px-0 py-4"
      isModal
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      onCancel={close}
    >
      <div className="space-y-4">
        <FileUpload setSingleFile={setFile} />

        <SelectComponent
          data={[
            { value: "multiple-choice", label: "Multiple-Choice" },
            { value: "true/false", label: "True/False" },
          ]}
          label="Type"
          placeholder="Select Quiz Type"
          form={form}
          name="type"
        />

        <TextInputComponent
          label="Qustion"
          placeholder="Enter Question"
          withAsterisk
          form={form}
          name="title"
        />

        {form.values.type === "multiple-choice" && (
          <TextInputComponent
            label="Optional Answer"
            placeholder="Enter Optional Answer"
            withAsterisk
            value={optionalAnswer}
            onChange={(e) => setOptionalAnswer(e.target.value)}
            classNames={{
              rightSection: "w-[80px]",
            }}
            onKeyDown={(e) => e.key === "Enter" && newOptionCreateHandler()}
            rightSection={
              <MyButton
                className="rounded-l-none"
                onClick={newOptionCreateHandler}
                size="sm"
              >
                Create
              </MyButton>
            }
          />
        )}

        <div>
          <Heading tag="h6">
            Select Correct Answers <span className="text-red-500">*</span>
          </Heading>

          <div className="flex items-center gap-2 flex-wrap mt-4">
            <Chip.Group
              multiple={false}
              value={correctAnswer}
              onChange={setCorrectAnswer}
            >
              {form.values.type === "true/false" ? (
                <>
                  <Chip value="True">True</Chip>
                  <Chip value="False">False</Chip>
                </>
              ) : (
                options?.map((option: string) => (
                  <Chip value={option}>
                    {option}

                    {correctAnswer != option && (
                      <ActionIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          setOptions((prev) =>
                            prev.filter((opt) => opt !== option)
                          );
                        }}
                        className="translate-x-2"
                      >
                        <IconX size={16} />
                      </ActionIcon>
                    )}
                  </Chip>
                ))
              )}
            </Chip.Group>
          </div>

          <div className="mt-4 space-y-1">
            <Alert icon={<IconAlertCircle size={18} />} color="orange">
              Plese press the correct answer
            </Alert>
            {form.values.type === "multiple-choice" && (
              <Alert icon={<IconAlertCircle size={18} />} color="orange">
                In Multiple-Choice,maximum optional answers is 6
              </Alert>
            )}
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default CreateQuizQuestion;
