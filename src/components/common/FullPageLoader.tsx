import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Loader } from "@mantine/core";
import Heading from "../typography/Heading";

interface PropsType {
  loadingText?: string;
}

const FullPageLoader: React.FC<PropsType> = ({
  loadingText = "Loading ...",
}) => {
  const [elapsedTime, setElapsedTime] = useState<string>("00:00");

  useEffect(() => {
    const startTime = Date.now();

    const updateElapsedTime = () => {
      const now = Date.now();
      const seconds = Math.floor((now - startTime) / 1000);
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;

      setElapsedTime(
        `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
      );
    };

    const intervalId = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const loaderContent = (
    <div
      className="w-full h-screen flex justify-center items-center fixed z-[1000] top-0 
      left-0 bg-white bg-opacity-70"
    >
      <div className="flex items-center gap-4">
        <Loader size={"lg"} />
        <Heading tag="h2">{loadingText}</Heading>
        <Heading tag="h3">{elapsedTime}</Heading> {/* Display elapsed time */}
      </div>
    </div>
  );

  // Render loader in the body using portal
  return ReactDOM.createPortal(loaderContent, document.body);
};

export default FullPageLoader;
