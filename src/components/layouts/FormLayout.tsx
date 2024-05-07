import MyBreadcrumbs from "@/components/MyBreadcrumbs";
import MyButton from "@/components/buttons/MyButton";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "../forms/FormHeader";
import { twMerge } from "tailwind-merge";
import { Loader } from "@mantine/core";
import FullPageLoader from "../common/FullPageLoader";

export type FormHeaderType = {
  image: string;
  title: string;
};

interface PropsType {
  title?: string;
  children: React.ReactNode;
  linkItems?: { title: string; link: string }[];
  onSubmit: () => void;
  header?: FormHeaderType;
  isModal?: boolean;
  onCancel?: () => void;
  wrapperClassName?: string;
  submitLoading?: boolean;
  queryLoading?: boolean;
  fullpageLoading?: boolean;
}

const FormLayout = ({
  title,
  children,
  linkItems,
  header,
  onSubmit,
  isModal,
  onCancel,
  wrapperClassName = "w-full sm:space-y-6 space-y-4 md:p-8 sm:p-4 p-2 md:py-8 py-6",
  submitLoading,
  queryLoading,
  fullpageLoading = true,
}: PropsType) => {
  const navigate = useNavigate();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      {submitLoading && fullpageLoading && <FullPageLoader />}

      {header && <FormHeader data={header} />}

      <div className={twMerge(wrapperClassName)}>
        {title && <h1 className="text-2xl font-500">{title}</h1>}

        {linkItems && <MyBreadcrumbs items={linkItems} />}

        <form
          onSubmit={onSubmitHandler}
          className={twMerge(
            !isModal &&
              "w-full border border-opacity-30 shadow-md rounded-md md:p-8 sm:p-4 p-3 bg-white  !mt-6"
          )}
        >
          {queryLoading ? (
            <div className="w-full h-[100px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {children}

              <div className="w-full flex items-center justify-end gap-2 mt-6">
                <div>
                  <MyButton
                    onClick={() => {
                      onCancel ? onCancel() : navigate(-1);
                    }}
                    variant="outline"
                    color="red"
                  >
                    Cancel
                  </MyButton>
                </div>

                <div>
                  <MyButton type="submit" loading={submitLoading}>
                    Submit
                  </MyButton>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default FormLayout;
