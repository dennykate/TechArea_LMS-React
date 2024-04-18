/* eslint-disable @typescript-eslint/no-explicit-any */
import SelectComponent from "@/components/inputs/SelectComponent";
import { courseContentType } from "./data";
import FileUpload from "@/components/inputs/FileUpload";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import FormLayout from "@/components/layouts/FormLayout";
import { useForm } from "@mantine/form";
import VideoPlayer from "@/components/common/VideoPlayer";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import useMutate from "@/hooks/useMutate";
import { useState } from "react";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";

interface PropsType {
  close: () => void;
  data: any;
}

const EditCourseContent: React.FC<PropsType> = ({ close, data }) => {
  const [file, setFile] = useState<File | null>();

  const form = useForm({
    initialValues: {
      type: data?.content_type,
      youtubeURL: data?.content,
      text: data?.content,
      name: data?.name,
      description: data?.description,
      timmer: data?.timmer,
    },
    validateInputOnBlur: true,
    validate: {
      type: (value: string) => (value.length > 0 ? null : "Type is required"),
      name: (value: string) => (value.length > 0 ? null : "Name is required"),
      description: (value: string) =>
        value.length > 0 ? null : "Description is required",
      timmer: (value: number, values: any) =>
        values.type != "text" && values.type != "image"
          ? null
          : value > 0
          ? null
          : "Timmer is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate({
    navigateBack: false,
    callback: () => close(),
  });

  const onSubmitHandler = (values: any) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (file) formData.append("file", file as File);

    onSubmit(`/course-contents/${data?.id}`, formData, "POST", true);
  };

  return (
    <FormLayout
      wrapperClassName="sm:px-2 px-0 py-4"
      isModal
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      onCancel={close}
    >
      <div className="space-y-4">
        {(form.values.type === "image" || form.values.type === "video") && (
          <FileUpload
            defaultImage={data?.content_type == "image" && data?.content}
            type={form.values.type as "video" | "image"}
            setSingleFile={setFile}
          />
        )}

        {form.values.type === "youtube" && (
          <>
            <VideoPlayer url={form.values.youtubeURL} />

            <TextInputComponent
              label="Youtube URL"
              placeholder="Enter Youtube URL"
              form={form}
              name="youtubeURL"
              withAsterisk
            />
          </>
        )}

        {form.values.type === "text" && (
          <TextEditorInput
            value={form.values.text}
            onChange={(val) => form.setFieldValue("text", val)}
          />
        )}

        <TextInputComponent
          label="Name"
          placeholder="Enter Name"
          withAsterisk
          form={form}
          name="name"
        />

        <SelectComponent
          data={courseContentType}
          label="Content Type"
          withAsterisk
          placeholder="Select Content Type"
          form={form}
          name="type"
        />

        <TextAreaComponent
          label="Description"
          placeholder="Enter Description"
          withAsterisk
          form={form}
          name="description"
        />

        {(form.values.type === "text" || form.values.type === "image") && (
          <NumberInputComponent
            label="Duration ( In Minutes )"
            placeholder="Enter duration"
            withAsterisk
            form={form}
            name="timmer"
          />
        )}
      </div>
    </FormLayout>
  );
};

export default EditCourseContent;
