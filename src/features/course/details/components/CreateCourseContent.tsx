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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";

interface PropsType {
  close: () => void;
}

const CreateCourseContent: React.FC<PropsType> = ({ close }) => {
  const { courseId } = useParams();
  const [file, setFile] = useState<File | null>();

  const form = useForm({
    initialValues: {
      type: "image",
      youtubeURL: "",
      text: "",
      name: "",
      description: "",
      timmer: 0,
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
    if (form.values.type == "image" || form.values.type == "video") {
      if (!file) return toast.error("File is required");
    }

    if (form.values.type == "text") {
      if (form.values.text == "") return toast.error("Text is required");
    }

    if (form.values.type == "youtube") {
      if (form.values.youtubeURL == "")
        return toast.error("Youtube URL is required");
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formData.append("course_id", courseId as string);
    if (file) formData.append("file", file as File);

    onSubmit("/course-contents", formData, "POST", true);
  };

  useEffect(() => {
    setFile(null);
    form.setFieldValue("youtubeURL", "");
  }, [form.values.type]);

  return (
    <FormLayout
      wrapperClassName="sm:px-2 px-0 py-4"
      isModal
      fullpageLoading
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      onCancel={close}
    >
      <div className="space-y-4">
        <TextInputComponent
          label="Name"
          placeholder="Enter Name"
          withAsterisk
          form={form}
          name="name"
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
            label="Course Duration ( In Minutes )"
            placeholder="Enter duration"
            withAsterisk
            form={form}
            name="timmer"
          />
        )}

        <SelectComponent
          data={courseContentType}
          label="Content Type"
          withAsterisk
          placeholder="Select Content Type"
          form={form}
          name="type"
        />

        {form.values.type === "image" && (
          <FileUpload
            type={form.values.type as "video" | "image"}
            setSingleFile={setFile}
          />
        )}

        {form.values.type === "video" && (
          <FileUpload
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
      </div>
    </FormLayout>
  );
};

export default CreateCourseContent;
