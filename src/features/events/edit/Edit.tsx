/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";
import TextInputComponent from "@/components/inputs/TextInputComponent";

import FileUpload from "@/components/inputs/FileUpload";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import { useState } from "react";
import useQuery from "@/hooks/useQuery";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { eventId } = useParams();
  const [file, setFile] = useState<File>();
  const [defaultImage, setDefaultImage] = useState<string>();
  const form = useForm<any>({
    initialValues: {
      title: "",
      description: "",
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) =>
        value?.length > 0 ? null : "Title is required",
      description: (value: string) =>
        value?.length > 0 ? null : "Note is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const { isLoading: queryLoading } = useQuery(`/events/${eventId}`, (data) => {
    form.setFieldValue("title", data?.title);
    form.setFieldValue("description", data?.description);
    setDefaultImage(data?.image);
  });

  const onSubmitHandler = (values: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (file) formData.append("image", file as File);

    onSubmit(`/events/${eventId}`, formData);
  };

  return (
    <FormLayout
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      title="Edit Event"
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Event List", link: "/events/list" },
        { title: "Edit Event", link: "" },
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
          label="Note"
          value={form.values.description}
          onChange={(val) => form.setFieldValue("description", val)}
        />
        <div className="!mt-6">
          <FileUpload
            type="image"
            setSingleFile={setFile}
            defaultImage={defaultImage}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default Edit;
