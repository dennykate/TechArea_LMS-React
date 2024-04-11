/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import Heading from "@/components/typography/Heading";
import { useNavigate } from "react-router-dom";

interface PropsType {
  data: any;
  questionCount: number;
}

const QuizComplete: React.FC<PropsType> = ({ data, questionCount }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full p-8 flex flex-col gap-4 items-center">
      <div className="w-full flex justify-center items-center">
        <img
          src="https://i.postimg.cc/nrsrCmJr/Achievement-bro.png"
          alt="archieve"
          className="w-[200px] h-[200px] object-cover"
        />
      </div>

      <Heading tag="h1">Congratulations</Heading>

      <p className="text-base text-center text-black/50">
        You get {data?.score} Marks in {questionCount} Questions. <br />(
        {data?.score_percentage}% score percentage)
      </p>

      <div className="flex items-center gap-4">
        <MyButton onClick={() => navigate("/student-quizzes")}>
          Back To Quizzes
        </MyButton>
      </div>
    </div>
  );
};

export default QuizComplete;
