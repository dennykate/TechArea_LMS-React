/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import { useState } from "react";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import toast from "react-hot-toast";
import FileUpload from "@/components/inputs/FileUpload";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";

const Create = () => {
  const [file, setFile] = useState<File | undefined>();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      grade_id: "",
      section_id: "",
      subject_id: "",
    },
    validateInputOnBlur: true,
    validate: {
      name: (value: string) => (value.length > 0 ? null : "Title is required"),
      grade_id: (value: string) =>
        value.length > 0 ? null : "Grade is required",
      section_id: (value: string) =>
        value.length > 0 ? null : "Section is required",
      subject_id: (value: string) =>
        value.length > 0 ? null : "Subject is required",
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

    formData.append("thumbnail", file as File);

    onSubmit("/courses", formData, "POST", true);

    setFile(undefined);
  };

  return (
    <FormLayout
      title="Create Course"
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Course List", link: "/courses/list" },
        { title: "New Course", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <div className="flex flex-col gap-4 mt-4">
        <TextInputComponent
          label="Name"
          placeholder="Enter name"
          withAsterisk
          form={form}
          name="name"
        />

        <GradeSectionSubject form={form} />

        <TextEditorInput
          label="Description"
          value={form.values.description}
          onChange={(val) => form.setFieldValue("description", val)}
        />

        <FileUpload type={"image"} setSingleFile={setFile} />
      </div>
    </FormLayout>
  );
};

export default Create;
