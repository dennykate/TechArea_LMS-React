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
import useQuery from "@/hooks/useQuery";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { zoomRecordId } = useParams();
  const [file, setFile] = useState<File>();
  const [urls, setUrls] = useState<any>([]);
  const [defaultImage, setDefaultImage] = useState<string>("");

  const form = useForm({
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
        value.length > 0 ? null : "Note is required",
      grade_id: (value: string) =>
        value.length > 0 ? null : "Grade is required",
      // section_id: (value: string) =>
      //   value.length > 0 ? null : "Section is required",
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

    onSubmit(`/zoom-records/${zoomRecordId}`, formData, "POST", true);
  };

  const { isLoading: queryLoading } = useQuery(
    `/zoom-records/${zoomRecordId}`,
    (data) => {
      form.setFieldValue("title", data?.title);
      form.setFieldValue("description", data?.description);
      form.setFieldValue("grade_id", data?.grade_id);
      form.setFieldValue("section_id", data?.section_id);
      form.setFieldValue("subject_id", data?.subject_id);

      if (data?.image) {
        setDefaultImage(data?.image);
      }

      setUrls(data?.urls);
    }
  );

  return (
    <FormLayout
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      title="Edit Zoom Record"
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Zoom Record List", link: "/zoom-records/list" },
        { title: "Edit Zoom Record", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <div className="flex flex-col gap-4 mt-4">
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
            defaultImage={defaultImage}
            type="image"
            setSingleFile={setFile}
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

export default Edit;
