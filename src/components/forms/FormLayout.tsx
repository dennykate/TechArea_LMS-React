import MyBreadcrumbs from "@/components/MyBreadcrumbs";
import MyButton from "@/components/buttons/MyButton";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "./FormHeader";

export type FormHeaderType = {
  image: string;
  title: string;
};

interface PropsType {
  title: string;
  children: React.ReactNode;
  linkItems: { title: string; link: string }[];
  onSubmit: () => void;
  header?: FormHeaderType;
}

const FormLayout = ({
  title,
  children,
  linkItems,
  header,
  onSubmit,
}: PropsType) => {
  const navigate = useNavigate();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      {header && <FormHeader data={header} />}

      <div className="w-full sm:space-y-6 space-y-4 md:p-8 sm:p-4 p-2 md:py-8 py-6">
        <h1 className="text-2xl font-500">{title}</h1>

        <MyBreadcrumbs items={linkItems} />

        <form
          onSubmit={onSubmitHandler}
          className="w-full border border-opacity-30 shadow-md rounded-md md:p-8 sm:p-4 p-3 bg-white space-y-4 !mt-6"
        >
          {children}

          <div className="w-full flex items-center justify-end gap-2">
            <div>
              <MyButton
                onClick={() => navigate(-1)}
                variant="outline"
                color="red"
              >
                Cancel
              </MyButton>
            </div>

            <div>
              <MyButton>Create</MyButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormLayout;
