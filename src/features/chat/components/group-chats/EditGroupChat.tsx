/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import FileUpload from "@/components/inputs/FileUpload";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import useMutate from "@/hooks/useMutate";
import useQuery from "@/hooks/useQuery";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface PropsType {
  onClose: () => void;
  id: string;
}

const EditGroupChat: React.FC<PropsType> = ({ onClose, id }) => {
  const [file, setFile] = useState<File | undefined>();
  const [defaultImage, setDefaultImage] = useState<string>("");

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

  useQuery(`/group-chats/${id}`, (data: any) => {
    form.setFieldValue("name", data?.name);
    form.setFieldValue("description", data?.description);

    if (data?.image) {
      setDefaultImage(data?.image);
    }
  });

  const [onSubmit, { isLoading }] = useMutate({
    navigateBack: false,
    callback: () => {
      onClose();
    },
  });

  const onSubmitHandler = (data: any) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    if (file) {
      formData.append("image", file as File);
    }

    return onSubmit(`/group-chats/${id}`, formData, "POST", true);
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

      <FileUpload setSingleFile={setFile} defaultImage={defaultImage} />

      <div className="w-full flex justify-end">
        <MyButton loading={isLoading} type="submit">
          Create
        </MyButton>
      </div>
    </form>
  );
};

export default EditGroupChat;
