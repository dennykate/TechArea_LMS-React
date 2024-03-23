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

      <div className="w-full space-y-4 p-8">
        <h1 className="text-2xl font-500">{title}</h1>

        <MyBreadcrumbs items={linkItems} />

        <form
          onSubmit={onSubmitHandler}
          className="w-full border border-opacity-30 shadow-md rounded-md p-8 bg-white space-y-4 !mt-6"
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
