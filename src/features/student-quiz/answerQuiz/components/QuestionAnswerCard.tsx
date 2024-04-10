/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/typography/Heading";
import { Group, Radio } from "@mantine/core";

interface PropsType {
  data: any;
  index: number;
}

const QuestionAnswerCard: React.FC<PropsType> = ({ data, index }) => {
  return (
    <div className="w-full py-6 border-b border-black border-opacity-10 relative">
      <div className="mb-3">
        <Heading tag="h6">Question - {index + 1}</Heading>
      </div>

      <img
        src="https://i.postimg.cc/6qrGKPhX/design-online-course-thumbnail-udemy-course-cover-image.webp"
        alt="question-image"
        className="w-[500px] h-[250px] object-cover"
      />

      <Heading tag="h6" className="mt-4">
        {data?.title}
      </Heading>

      <div className="mt-2 flex items-center gap-2">
        <Radio.Group>
          <Group mt="xs" spacing={22}>
            {data?.options?.map((option: any) => (
              <Radio
                key={option?.id}
                classNames={{
                  radio: "!border-black/50",
                  label: "!pl-[6px]",
                }}
                value={option?.content}
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
