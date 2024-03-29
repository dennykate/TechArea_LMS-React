import { Loader } from "@mantine/core";

const WrapperLoading = () => {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
      <Loader size="lg" />
    </div>
  );
};

export default WrapperLoading;
