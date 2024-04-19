/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";
import TextInputComponent from "@/components/inputs/TextInputComponent";

import FileUpload from "@/components/inputs/FileUpload";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import { useState } from "react";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import Heading from "@/components/typography/Heading";
import ZoomRecordURLs from "../components/ZoomRecordURLs";
import toast from "react-hot-toast";

const Create = () => {
  const [file, setFile] = useState<File>();
  const [urls, setUrls] = useState<any>([]);

  const form = useForm<any>({
    initialValues: {
      title: "",
      description: "",
      image: "",
      grade_id: "",
      section_id: "",
      subject_id: "",
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) => (value.length > 0 ? null : "Title is required"),
      description: (value: string) =>
        value.length > 0 ? null : "Description is required",
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
    if (urls?.length === 0) return toast.error("Record urls are required");

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (file) formData.append("image", file as File);

    urls?.forEach((item: any) => {
      formData.append(`urls[]`, item.url as string);
    });

    onSubmit("/zoom-records", formData);
  };

  return (
    <FormLayout
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      title="Create Zoom Record"
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Zoom Record List", link: "/zoom-records/list" },
        { title: "New Zoom Record", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <div className="space-y-4">
        <TextInputComponent
          label="Title"
          placeholder="Enter title"
          withAsterisk
          form={form}
          name="title"
        />

        <TextEditorInput
          label="Description"
          value={form.values.description}
          onChange={(val) => form.setFieldValue("description", val)}
        />

        <GradeSectionSubject form={form} />

        <div className="!my-6">
          <FileUpload type="image" setSingleFile={setFile} />
        </div>

        <div className="space-y-2">
          <Heading tag="h2">Record URLS</Heading>

          <ZoomRecordURLs urls={urls} setUrls={setUrls} />
        </div>
      </div>
    </FormLayout>
  );
};

export default Create;
