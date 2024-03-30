import { ActionIcon, Alert, Chip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconX } from "@tabler/icons-react";
import { useState } from "react";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import FormLayout from "@/components/layouts/FormLayout";
import SelectComponent from "@/components/inputs/SelectComponent";
import Heading from "@/components/typography/Heading";
import MyButton from "@/components/buttons/MyButton";
import toast from "react-hot-toast";

interface PropsType {
  close: () => void;
}

const EditQuizQuestion: React.FC<PropsType> = ({ close }) => {
  const form = useForm({
    initialValues: {
      type: "true/false",
    },
  });

  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [optionalAnswer, setOptionalAnswer] = useState<string>("");

  const newOptionCreateHandler = () => {
    if (options.length >= 4)
      return toast.error("Sorry, maximun answers limit exceeded");

    setOptions((prev: string[]) => {
      return [...prev, optionalAnswer];
    });

    setOptionalAnswer("");
  };

  return (
    <FormLayout
    wrapperClassName="sm:px-2 px-0 py-4"
      isModal
      onSubmit={() => {}}
      onCancel={close}
    >
      <div className="space-y-4">
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
        />

        {form.values.type === "multiple-choice" && (
          <TextInputComponent
            label="Optional Answer"
            placeholder="Enter Optional Answer"
            withAsterisk
            value={optionalAnswer}
            onChangeHandler={(e) => setOptionalAnswer(e.target.value)}
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
                  <Chip value="true">True</Chip>
                  <Chip value="false">False</Chip>
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
              Plese click the correct answer
            </Alert>
            {form.values.type === "multiple-choice" && (
              <Alert icon={<IconAlertCircle size={18} />} color="orange">
                In Multiple-Choice,maximum optional answers is 4
              </Alert>
            )}
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default EditQuizQuestion;
