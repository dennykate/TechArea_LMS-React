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
import useQuery from "@/hooks/useQuery";
import { useParams } from "react-router-dom";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
import NotAllowed from "@/components/common/NotAllowed";
import checkPermission from "@/utilities/check-permission";

const Edit = () => {
  const { courseId } = useParams();
  const [defaultImage, setDefaultImage] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [creatorId, setCreatorId] = useState<string>("");

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
      name: (value: string) => (value?.length > 0 ? null : "Title is required"),
      grade_id: (value: string) =>
        value?.length > 0 ? null : "Grade is required",
      // section_id: (value: string) =>
      //   value?.length > 0 ? null : "Section is required",
      subject_id: (value: string) =>
        value?.length > 0 ? null : "Subject is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const { isLoading: queryLoading } = useQuery(
    `/courses/${courseId}`,
    (data) => {
      setDefaultImage(data?.thumbnail);
      setCreatorId(data?.created_by_id);

      form.setFieldValue("name", data?.name);
      form.setFieldValue("grade_id", data?.grade_id);
      form.setFieldValue("section_id", data?.section_id);
      form.setFieldValue("subject_id", data?.subject_id);
      form.setFieldValue("description", data?.description);
    }
  );

  const onSubmitHandler = (values: any) => {
    if (values.description == "") return toast.error("Note is requried");
    // if (!file) return toast.error("File is requried");

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formData.append("thumbnail", file as File);

    onSubmit(`/courses/${courseId}`, formData, "POST", true);

    setFile(undefined);
  };

  if (!checkPermission(creatorId)) return <NotAllowed />;

  return (
    <FormLayout
      title="Edit Lesson"
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Lesson List", link: "/courses/list" },
        { title: "Edit Lesson", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Better Change",
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

        <GradeSectionSubject
          form={form}
          asterisk={{
            grade: true,
            subject: true,
          }}
        />

        <TextEditorInput
          label="Note"
          value={form.values.description}
          onChange={(val) => form.setFieldValue("description", val)}
        />

        {/* {defaultImage?.length > 0 && (
          <MyCarousel slides={defaultImages} onDelete={handleDelete} />
        )} */}

        <FileUpload
          type={"image"}
          label="Image"
          setSingleFile={setFile}
          defaultImage={defaultImage}
        />
      </div>
    </FormLayout>
  );
};

export default withPermissions(Edit, banRoles.courses);
