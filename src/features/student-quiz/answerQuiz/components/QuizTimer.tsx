import { useState, useEffect } from "react";
import { IoMdTimer } from "react-icons/io";

const QuizTimer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="w-[100px] h-[40px] bg-primary-500 flex justify-center items-center gap-2">
      <IoMdTimer size={20} className="text-white" />
      <span className="text-white text-base font-bold">
        {formatTime(seconds)}
      </span>
    </div>
  );
};

export default QuizTimer;
