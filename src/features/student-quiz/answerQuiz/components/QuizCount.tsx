interface PropsType {
  total?: number;
  current?: number;
}

const QuizCount: React.FC<PropsType> = ({ total, current }) => {
  return (
    <div className="w-[100px] h-[40px] bg-primary-500 flex justify-center items-center gap-2">
      <span className="text-white text-base font-bold">
        {current}/{total}
      </span>
    </div>
  );
};

export default QuizCount;
