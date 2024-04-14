import React, { ChangeEvent } from "react";
import { TextInput, Textarea, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { usePostDataMutation } from "@/redux/api/formApi";
import toast from "react-hot-toast";

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

  const [createGroup] = usePostDataMutation();

  const handleSubmit = async (values: typeof form.values) => {
    const { name, description, image } = values;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await createGroup({
        url: "/group-chats",
        method: "POST",
        body: formData,
      });

      if (response?.data?.status === "success") {
        toast.success("Group created successfully!");
        close();
        form.reset();
      } else {
        console.error("Failed to create group");
      }
      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="name"
          placeholder="Enter group name"
          {...form.getInputProps("name")}
        />
        <Textarea
          label="Description"
          placeholder="Describe your group"
          {...form.getInputProps("description")}
        />
        <TextInput
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
          <Button variant="outline" color="blue" type="submit">
            Create
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default CreateGroup;
