/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import FileUpload from "@/components/inputs/FileUpload";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import useMutate from "@/hooks/useMutate";
import { useForm } from "@mantine/form";
import { useState } from "react";
import toast from "react-hot-toast";

interface PropsType {
  onClose: () => void;
}

const CreateGroupChat: React.FC<PropsType> = ({ onClose }) => {
  const [file, setFile] = useState<File | undefined>();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    validateInputOnBlur: true,
    validate: {
      name: (value: string) =>
        value?.length > 0 ? null : "Grade name is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate({
    navigateBack: false,
    callback: () => {
      onClose();
    },
  });

  const onSubmitHandler = (data: any) => {
    if (!file) return toast.error("Image is required");

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", file as File);

    return onSubmit("/group-chats", formData);
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      className="w-full flex flex-col gap-5"
    >
      <TextInputComponent
        label="Group Name"
        placeholder="Enter group name"
        withAsterisk
        form={form}
        name="name"
      />
      <TextAreaComponent
        label="Group Note"
        placeholder="Enter group note"
        withAsterisk
        form={form}
        name="description"
      />
      <FileUpload setSingleFile={setFile} />
      <div className="w-full flex justify-end">
        <MyButton loading={isLoading} type="submit">
          Create
        </MyButton>
      </div>
    </form>
  );
};

export default CreateGroupChat;
