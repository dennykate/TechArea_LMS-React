import { Suspense } from "react";
import WrapperLoading from "./loadings/WrapperLoading";

interface PropsType {
  children: React.ReactNode;
}

const Wrapper = ({ children }: PropsType) => {
  return <Suspense fallback={<WrapperLoading />}>{children}</Suspense>;
};

export default Wrapper;
