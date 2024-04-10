import Heading from "@/components/typography/Heading";

const QuizComplete = () => {
  return (
    <div className="w-full p-8 flex flex-col gap-4 items-center">
      <div className="w-full flex justify-center items-center">
        <img src="" alt="image" className="w-[150px] h-[150px] object-cover" />
      </div>

      <Heading tag="h2">Congratulations</Heading>

      <p className="text-sm text-center text-black/50">You get 3 Marks in 3 Questions. (100% score percentage)</p>
    </div>
  );
};

export default QuizComplete;
