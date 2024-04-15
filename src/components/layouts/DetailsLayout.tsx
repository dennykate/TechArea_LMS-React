import { Loader } from "@mantine/core";
import MyBreadcrumbs from "../MyBreadcrumbs";

interface PropsType {
  children: React.ReactNode;
  linkItems: { title: string; link: string }[];
  isLoading?: boolean;
}

const DetailsLayout: React.FC<PropsType> = ({
  children,
  linkItems,
  isLoading,
}) => {
  return (
    <div className="w-full md:p-8 sm:p-4 p-2 md:py-8 py-6 ">
      <MyBreadcrumbs items={linkItems} />

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
