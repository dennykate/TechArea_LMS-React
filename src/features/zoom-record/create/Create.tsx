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
  const [files, setFiles] = useState<File[]>([]);
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
      title: (value: string) =>
        value?.length > 0 ? null : "Title is required",
      description: (value: string) =>
        value?.length > 0 ? null : "Note is required",
      grade_id: (value: string) =>
        value?.length > 0 ? null : "Grade is required",
      // section_id: (value: string) =>
      //   value?.length > 0 ? null : "Section is required",
      subject_id: (value: string) =>
        value?.length > 0 ? null : "Subject is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();
  const onSubmitHandler = (values: any) => {
    // if (urls?.length === 0) return toast.error("Record urls are required");
    if (files?.length === 0) return toast.error("Classroom files are required");

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (files) {
      // formData.append("image", files as File);

      files.forEach((file: File) => {
        formData.append("files[]", file as File);
      });
    }

    urls?.forEach((item: any) => {
      formData.append(`urls[]`, item.url as string);
    });

    onSubmit("/zoom-records", formData);
  };

  return (
    <FormLayout
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      title="Create Classroom Record"
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Classroom Record List", link: "/zoom-records/list" },
        { title: "New Classroom Record", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Better Change",
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
          label="Note"
          value={form.values.description}
          onChange={(val) => form.setFieldValue("description", val)}
        />

        <GradeSectionSubject
          form={form}
          asterisk={{
            grade: true,
            subject: true,
          }}
        />

        <div className="!my-6">
          <FileUpload
            type="image"
            setMultileFile={setFiles}
            label="Files"
            withAsterisk
            multiple
          />
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
