/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import { useForm } from "@mantine/form";
import FileUpload from "@/components/inputs/FileUpload";
import useMutate from "@/hooks/useMutate";
import { useState } from "react";
import toast from "react-hot-toast";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";

const Create = () => {
  const [file, setFile] = useState<File | undefined>();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      grade: "",
      section: "",
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) => (value.length > 0 ? null : "Title is required"),
      grade: (value: string) => (value.length > 0 ? null : "Grade is required"),
      section: (value: string) =>
        value.length > 0 ? null : "Section is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (values: any) => {
    if (values.description == "") return toast.error("Description is requried");
    if (!file) return toast.error("File is requried");

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formData.append("file", file as File);

    onSubmit("/assignments", values, "POST", true);
  };

  return (
    <FormLayout
      title="Create Assignment"
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Assignment List", link: "/assignments/list" },
        { title: "New Assignment", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Lorem espum",
      }}
    >
      <div className="w-full">
        <TextInputComponent
          label="Title"
          placeholder="Enter title"
          inputClassName="mb-3"
          withAsterisk
          form={form}
          name="title"
        />

        <TextEditorInput
          label="Description"
          content={form.values.description}
          handleChange={(val) => form.setFieldValue("description", val)}
          inputClassName="mb-5"
        />

        <GradeSectionSubject form={form} />

        <FileUpload type={"all"} className="mt-5" />
      </div>
    </FormLayout>
  );
};

export default Create;
