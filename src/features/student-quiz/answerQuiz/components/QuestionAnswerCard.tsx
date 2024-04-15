/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/typography/Heading";
import { Group, Radio } from "@mantine/core";
import { useState } from "react";

interface PropsType {
  data: any;
  index: number;
  onAnswer: (x: string) => void;
}

const QuestionAnswerCard: React.FC<PropsType> = ({ data, index, onAnswer }) => {
  const [value, setValue] = useState<string>("");

  return (
    <div className="w-full py-6 border-b border-black border-opacity-10 relative">
      <div className="mb-3">
        <Heading tag="h6">Question - {index + 1}</Heading>
      </div>

      {data?.image && (
        <img
          src={data?.image}
          alt={data?.title}
          className="w-[500px] h-[250px] object-cover"
        />
      )}

      <Heading tag="h6" className="mt-4">
        {data?.title}
      </Heading>

      <div className="mt-2 flex items-center gap-2">
        <Radio.Group
          value={value}
          onChange={(val: string) => {
            setValue(val);
            onAnswer(val);
          }}
        >
          <Group mt="xs" spacing={22}>
            {data?.options?.map((option: any) => (
              <Radio
                key={option?.id}
                classNames={{
                  radio: "!border-black/50",
                  label: "!pl-[6px]",
                }}
                value={option?.id}
                label={option?.content}
              />
            ))}
          </Group>
        </Radio.Group>
      </div>
    </div>
  );
};

export default QuestionAnswerCard;
