import { Loader } from "@mantine/core";
import React from "react";
import Heading from "../typography/Heading";

interface PropsType {
  loadingText?: string;
}

const FullPageLoader: React.FC<PropsType> = ({
  loadingText = "Loading ...",
}) => {
  return (
    <div
      className="w-full h-screen flex justify-center items-center fixed z-[1000] top-0 
    left-0 bg-white bg-opacity-70"
    >
      <div className="flex items-center gap-4">
        <Loader size={"lg"} />
        <Heading tag="h2">{loadingText}</Heading>
      </div>
    </div>
  );
};

export default FullPageLoader;
