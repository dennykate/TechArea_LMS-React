import { Loader } from "@mantine/core";
import React from "react";

const WrapperLoading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader size="lg" />
    </div>
  );
};

export default WrapperLoading;
