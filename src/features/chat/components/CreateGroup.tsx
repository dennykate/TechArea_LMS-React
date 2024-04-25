/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import useMutate from "@/hooks/useMutate";

interface DataProps {
  name: string;
  description: string;
  image: File | null;
}
interface Props {
  close: () => void;
}
const CreateGroup: React.FC<Props> = ({ close }) => {
  const form = useForm<DataProps>({
    initialValues: {
      name: "",
      description: "",
      image: null,
    },
    validate: {
      name: (value) => (value ? null : "Name is required"),
      description: (value) => (value ? null : "Description is required"),
    },
  });

  const [createGroup, { isLoading }] = useMutate({
    callback: () => {
      close();
    },
    navigateBack: false,
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { name, description, image } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image instanceof File) {
      formData.append("image", image);
    }

    createGroup("/group-chats", formData, "POST", true);
  };

  return (
    <div className="p-5">
      <form className="space-y-4" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInputComponent
          label="Name"
          placeholder="Enter group name"
          form={form}
          name="name"
        />
        <TextAreaComponent
          label="Description"
          placeholder="Describe your group"
          form={form}
          name="description"
        />
        <TextInputComponent
          size="lg"
          type="file"
          label="Group Image"
          accept="image/*"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            form.setFieldValue(
              "image",
              event.currentTarget.files ? event.currentTarget.files[0] : null
            )
          }
        />
        <Group position="right" mt="md">
          <Button loading={isLoading} color="blue" type="submit">
            Create
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default CreateGroup;
