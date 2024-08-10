import { Loader } from "@mantine/core";
import MyBreadcrumbs from "../MyBreadcrumbs";
import MyButton from "../buttons/MyButton";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface PropsType {
  children: React.ReactNode;
  linkItems: { title: string; link: string }[];
  isLoading?: boolean;
  backBtn?: boolean;
}

const DetailsLayout: React.FC<PropsType> = ({
  children,
  linkItems,
  isLoading,
  backBtn,
}) => {
  
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className="w-full md:p-8 sm:p-4 p-2 md:py-8 py-6 ">
      <MyBreadcrumbs items={linkItems} />

      {backBtn && (
        <MyButton onClick={handleBackClick} className="!w-auto !px-5 !py-2">
          <div className="flex gap-2">
            <IoMdArrowRoundBack />
            Back
          </div>
        </MyButton>
      )}

      <div className="w-full border border-opacity-30 shadow-md rounded-md md:p-8 sm:p-4 p-3 bg-white mt-6">
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <Loader size={35} />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default DetailsLayout;
