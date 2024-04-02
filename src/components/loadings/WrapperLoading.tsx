import { Loader } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const fullScreenPaths = ["/", "/login"];

const WrapperLoading = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={twMerge(
        "w-full flex justify-center items-center",
        fullScreenPaths.includes(pathname)
          ? "h-screen"
          : "h-[calc(100vh-100px)] "
      )}
    >
      <Loader size="lg" />
    </div>
  );
};

export default WrapperLoading;
