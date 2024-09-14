/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import { useForm } from "@mantine/form";
import FileUpload from "@/components/inputs/FileUpload";
import useMutate from "@/hooks/useMutate";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import AdditionalLessons from "./components/AdditionalLessons";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import dayjs from "dayjs";
import DateTimeInputComponent from "@/components/inputs/DateTimeInputComponent";
import { useSearchParams } from "react-router-dom";

const Create = () => {
  const [files, setFiles] = useState<File[] | undefined>([]);
  const [additionalFiles, setAdditionalFiles] = useState<any>([]);
  const [searchParams] = useSearchParams();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      grade_id: "",
      section_id: "",
      subject_id: "",
      deadline: new Date(),
      marks: 0,
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) =>
        value?.length > 0 ? null : "Title is required",
      grade_id: (value: string) =>
        value?.length > 0 ? null : "Grade is required",
      // section_id: (value: string) =>
      //   value?.length > 0 ? null : "Section is required",
      subject_id: (value: string) =>
        value?.length > 0 ? null : "Subject is required",
      deadline: (value) => (value ? null : "Deadline is required"),
      marks: (value: number) => (value > 0 ? null : "Marks are required"),
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (values: any) => {
    if (values.description == "") return toast.error("Note is requried");
    if (files?.length === 0) return toast.error("File is requried");

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "deadline") {
        formData.append(key, dayjs(value as Date).format("DD-MM-YYYY HH:mm"));
        return;
      }

      formData.append(key, value as string);
    });

    files?.forEach((file: File) => {
      formData.append("files[]", file as File);
    });

    if (additionalFiles.length > 0) {
      additionalFiles?.map((additionalFile: any, index: number) => {
        if (additionalFile.file != "") {
          formData.append(`additionals[${index}][type]`, additionalFile.type);
          formData.append(`additionals[${index}][file]`, additionalFile.file);
        }
      });
    }

    onSubmit("/assignments", formData, "POST", true);

    setFiles([]);
  };

  useEffect(() => {
    const gradeId = searchParams.get("gradeId") as string;

    if (gradeId) form.setFieldValue("grade_id", gradeId);
  }, [searchParams]);

  return (
    <FormLayout
      title="Create Homework"
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Lorem espum",
      }}
    >
      <div className="w-full space-y-4">
        <TextInputComponent
          label="Title"
          placeholder="Enter title"
          withAsterisk
          form={form}
          name="title"
        />

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <NumberInputComponent
            label="Marks"
            placeholder="Enter marks"
            withAsterisk
            form={form}
            name="marks"
          />

          <DateTimeInputComponent
            label="Deadline"
            placeholder="Enter deadline"
            withAsterisk
            form={form}
            name="deadline"
          />
        </div>

        <TextEditorInput
          label="Note"
          withAsterisk
          value={form.values.description}
          onChange={(val) => form.setFieldValue("description", val)}
        />

        <GradeSectionSubject
          form={form}
          usage={["section", "subject"]}
          asterisk={{
            // grade: true,
            subject: true,
          }}
        />

        <FileUpload
          type={"image"}
          setMultileFile={setFiles}
          label="Images"
          withAsterisk
          multiple
        />

        <AdditionalLessons
          additonalFiles={additionalFiles}
          setAdditionalFiles={setAdditionalFiles}
        />
      </div>
    </FormLayout>
  );
};

export default Create;
