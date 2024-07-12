/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import FileUplaod from "@/components/inputs/FileUpload";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import { useState } from "react";
import toast from "react-hot-toast";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Create = () => {
  const [file, setFile] = useState<File | null>();

  const form = useForm<any>({
    initialValues: {
      title: "",
      grade_id: "",
      section_id: "",
      subject_id: "",
      description: "",
      answer_limit: 0,
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) => (value.length > 0 ? null : "Title is required"),
      grade_id: (value: string) =>
        value.length > 0 ? null : "Grade is required",
      // section_id: (value: string) =>
      //   value.length > 0 ? null : "Section is required",
      subject_id: (value: string) =>
        value.length > 0 ? null : "Subject is required",
      description: (value: string) =>
        value.length > 0 ? null : "Note is required",
      answer_limit: (value: number) =>
        value > 0 ? null : "Answer Limit is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (values: any) => {
    if (!file) return toast.error("Profile is required");

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formData.append("file", file as File);

    onSubmit("/quizzes", formData, "POST", true);
  };

  return (
    <FormLayout
      title="Create Quiz"
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Quiz List", link: "/quizzes/list" },
        { title: "New Quiz", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <FileUplaod setSingleFile={setFile} />

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

        <GradeSectionSubject
          form={form}
          asterisk={{
            grade: true,
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
      </div>
    </FormLayout>
  );
};

export default withPermissions(Create, banRoles.quizzes);
