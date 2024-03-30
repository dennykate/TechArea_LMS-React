import Heading from "@/components/typography/Heading";
import { Group, Radio } from "@mantine/core";

const QuestionAnswerCard = () => {
  return (
    <div className="w-full py-6 border-b border-black border-opacity-10 relative">
      <img
        src="https://i.postimg.cc/6qrGKPhX/design-online-course-thumbnail-udemy-course-cover-image.webp"
        alt="question-image"
        className="w-[500px] h-[250px] object-cover"
      />

      <Heading tag="h6" className="mt-4">
        What is the largest country in the world ?
      </Heading>

      <div className="mt-2 flex items-center gap-2">
        <Radio.Group>
          <Group mt="xs" spacing={22}>
            <Radio value="russia" label="Russia" />
            <Radio value="china" label="China" />
            <Radio value="us" label="US" />
            <Radio value="canada" label="Canada" />
          </Group>
        </Radio.Group>
      </div>

      <div
        className="absolute top-8 right-0 w-[25px] h-[25px] bg-primary-500 flex
       justify-center items-center text-white text-sm rounded-full font-[400]"
      >
        1
      </div>
    </div>
  );
};

export default QuestionAnswerCard;
