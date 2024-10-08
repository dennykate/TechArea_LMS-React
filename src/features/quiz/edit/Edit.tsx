/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import FileUplaod from "@/components/inputs/FileUpload";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import { useCallback, useState } from "react";
import useQuery from "@/hooks/useQuery";
import { useParams, useSearchParams } from "react-router-dom";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
// import useUserInfo from "@/hooks/use-user-info";
import NotAllowed from "@/components/common/NotAllowed";
import checkPermission from "@/utilities/check-permission";
import { MediaType } from "@/features/newfeed/components/Post";
import MyCarousel from "@/components/common/MyCarousel";
import alertActions from "@/utilities/alertActions";

const Edit = () => {
  const { quizId } = useParams();
  const [files, setFiles] = useState<File[] | null>([]);
  const [defaultImages, setDefaultImages] = useState<MediaType[]>([]);
  const [creatorId, setCreatorId] = useState<string>("");
  const [searchParams] = useSearchParams();
  // const userInfo = useUserInfo();

  const form = useForm<any>({
    initialValues: {
      title: "",
      grade_id: "",
      chapter_title: "",
      chapter_note: "",
      section_id: "",
      subject_id: "",
      description: "",
      answer_limit: 0,
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) =>
        value?.length > 0 ? null : "Title is required",
      grade_id: (value: string) =>
        value?.length > 0 ? null : "Grade is required",
      // section_id: (value: string) =>
      //   value?.length > 0 ? null : "Section is required",
      chapter_title: (value: string) =>
        value?.length > 0 ? null : "Chapter Title is required",
      chapter_note: (value: string) =>
        value?.length > 0 ? null : "Chapter Note is required",
      subject_id: (value: string) =>
        value?.length > 0 ? null : "Subject is required",
      description: (value: string) =>
        value?.length > 0 ? null : "Note is required",
      answer_limit: (value: number) =>
        value > 0 ? null : "Answer Limit is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (values: any) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (files && files?.length > 0) {
      files?.forEach((file: File) => formData.append("files[]", file as File));
    }

    onSubmit(`/quizzes/${quizId}`, formData, "POST", true);
  };

  const { isLoading: queryLoading } = useQuery(`quizzes/${quizId}`, (data) => {
    setDefaultImages(data?.medias);
    setCreatorId(data.created_by_id);

    form.setFieldValue("title", data?.title);
    form.setFieldValue("grade_id", data?.grade_id);
    form.setFieldValue("section_id", data?.section_id);
    form.setFieldValue("subject_id", data?.subject_id);
    form.setFieldValue("description", data?.description);
    form.setFieldValue("chapter_title", data?.chapter?.title);
    form.setFieldValue("chapter_note", data?.chapter?.note);
    form.setFieldValue("answer_limit", parseInt(data?.answer_limit));
  });

  const handleMediaDelete = useCallback((id: string) => {
    alertActions(
      () => onSubmit(`/medias/${id}`, {}, "DELETE"),
      "Are you sure to delete ?"
    );
  }, []);

  if (!checkPermission(creatorId)) return <NotAllowed />;

  return (
    <FormLayout
      title="Edit Test"
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Test List", link: `/courses/details/${searchParams.get("lesson_id")}` },
        { title: "Edit Test", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Better Change",
      }}
    >
      <div className="flex flex-col gap-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <TextInputComponent
            label="Title"
            placeholder="Enter title"
            withAsterisk
            form={form}
            name="title"
          />

          <NumberInputComponent
            label="Answer Count Limit"
            placeholder="Enter answer count limit"
            withAsterisk
            form={form}
            name="answer_limit"
          />
        </div>
        <TextInputComponent
          label="Chapter Title"
          placeholder="Enter chapter title"
          withAsterisk
          form={form}
          name="chapter_title"
        />
        <TextAreaComponent
          label="Chapter Note"
          placeholder="Enter chapter note"
          withAsterisk
          form={form}
          name="chapter_note"
        />
        <GradeSectionSubject
          form={form}
          usage={["section", "subject"]}
          asterisk={{
            subject: true,
          }}
        />

        <TextAreaComponent
          label="Note"
          placeholder="Enter note"
          withAsterisk
          form={form}
          name="description"
        />

        {defaultImages?.length > 0 && (
          <MyCarousel slides={defaultImages} onDelete={handleMediaDelete} />
        )}

        <FileUplaod setMultileFile={setFiles} multiple />
      </div>
    </FormLayout>
  );
};

export default withPermissions(Edit, banRoles.quizzes);
