/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import { useForm } from "@mantine/form";
import FileUpload from "@/components/inputs/FileUpload";
import useMutate from "@/hooks/useMutate";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import AdditionalLessons from "./components/AdditionalLessons";
import { useParams, useSearchParams } from "react-router-dom";
import useQuery from "@/hooks/useQuery";
import Attachments from "./components/Attachments";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import dayjs from "dayjs";
import DateTimeInputComponent from "@/components/inputs/DateTimeInputComponent";
// import useUserInfo from "@/hooks/use-user-info";
import NotAllowed from "@/components/common/NotAllowed";
import checkPermission from "@/utilities/check-permission";
import MyCarousel from "@/components/common/MyCarousel";
import { MediaType } from "@/features/newfeed/components/Post";
import alertActions from "@/utilities/alertActions";

const Edit = () => {
  const { assignmentId } = useParams();
  const [files, setFiles] = useState<File[] | undefined>([]);
  const [additionalFiles, setAdditionalFiles] = useState<any>([]);
  const [defaultImages, setDefaultImages] = useState<MediaType[]>([]);
  const [attachments, setAttachments] = useState<string>("");
  const [creatorId, setCreatorId] = useState<string>("");
  const [searchParams] = useSearchParams();
  // const userInfo = useUserInfo();

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
      deadline: (value) => (value ? null : "Subject is required"),
      marks: (value: number) => (value > 0 ? null : "Subject is required"),
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (values: any) => {
    if (values.description == "") return toast.error("Note is requried");

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "deadline") {
        formData.append(key, dayjs(value as Date).format("DD-MM-YYYY HH:mm"));
        return;
      }

      formData.append(key, value as string);
    });

    if (files && files?.length > 0) {
      files?.forEach((file: File) => {
        formData.append("files[]", file as File);
      });
    }

    if (additionalFiles.length > 0) {
      additionalFiles?.map((additionalFile: any, index: number) => {
        if (additionalFile?.file != "") {
          formData.append(`additionals[${index}][type]`, additionalFile.type);
          formData.append(`additionals[${index}][file]`, additionalFile.file);
        }
      });
    }

    onSubmit(`/assignments/${assignmentId}`, formData, "POST", true);

    setFiles(undefined);
  };

  const { isLoading: queryLoading } = useQuery(
    `/assignments/${assignmentId}`,
    (data) => {
      setDefaultImages(data?.medias);
      setAttachments(data?.attachments);
      setCreatorId(data?.created_by_id);

      form.setFieldValue("title", data?.title);
      form.setFieldValue("description", data?.description);
      form.setFieldValue("grade_id", data?.grade_id);
      form.setFieldValue("subject_id", data?.subject_id);
      form.setFieldValue("section_id", data?.section_id);
      form.setFieldValue("marks", parseInt(data?.marks));
      form.setFieldValue(
        "deadline",
        dayjs(data?.deadline, "DD-MM-YYYY HH:mm").toDate()
      );
    }
  );

  const handleMediaDelete = useCallback((id: string) => {
    alertActions(
      () => onSubmit(`/medias/${id}`, {}, "DELETE"),
      "Are you sure to delete ?"
    );
  }, []);

  if (!checkPermission(creatorId)) return <NotAllowed />;

  return (
    <FormLayout
      title="Edit Homework"
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        {
          title: "Homework List",
          link: `/courses/details/${searchParams.get("lesson_id")}`,
        },
        { title: "Edit Homework", link: "" },
      ]}
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
          value={form.values.description}
          onChange={(val) => form.setFieldValue("description", val)}
        />

        <GradeSectionSubject
          form={form}
          usage={["section", "subject"]}
          asterisk={{
            subject: true,
          }}
        />

        <MyCarousel slides={defaultImages} onDelete={handleMediaDelete} />

        <FileUpload type={"image"} setMultileFile={setFiles} multiple />

        {attachments?.length > 0 && <Attachments attachments={attachments} />}

        <AdditionalLessons
          additonalFiles={additionalFiles}
          setAdditionalFiles={setAdditionalFiles}
          addedCount={attachments?.length}
        />
      </div>
    </FormLayout>
  );
};

export default Edit;
