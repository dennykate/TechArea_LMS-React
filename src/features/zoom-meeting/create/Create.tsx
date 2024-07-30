/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";

// import { Group, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import useMutate from "@/hooks/useMutate";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
import dayjs from "dayjs";
import DateTimeInputComponent from "@/components/inputs/DateTimeInputComponent";

const Create = () => {
  const form = useForm({
    initialValues: {
      agenda: "",
      topic: "",
      meeting_id: "",
      meeting_url: "",
      meeting_password: "",
      grade_id: "",
      section_id: "",
      subject_id: "",
      start_date: new Date(),
    },
    validateInputOnBlur: true,
    validate: {
      start_date: (value) => (value ? null : "Start Date is required"),
      agenda: (value: string) =>
        value?.length > 0 ? null : "Agenda is required",
      topic: (value: string) =>
        value?.length > 0 ? null : "Topic is required",
      meeting_id: (value: string) =>
        value?.length > 0 ? null : "Meeting ID is required",
      meeting_url: (value: string) =>
        value?.length > 0 ? null : "Meeting URL is required",
      meeting_password: (value: string) =>
        value?.length > 0 ? null : "Meeting Password is required",
      grade_id: (value: string) =>
        value?.length > 0 ? null : "Grade ID is required",
      // section_id: (value: string) =>
      //   value?.length > 0 ? null : "Section ID is required",
      subject_id: (value: string) =>
        value?.length > 0 ? null : "Subject ID is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (data: any) => {
    onSubmit("/zooms", {
      ...data,
      start_time: dayjs(data?.start_date).format("D-M-YYYY HH:mm"),
    });
  };

  return (
    <FormLayout
      title="Create Online Classroom"
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Online Classroom List", link: "/zoom-meetings/list" },
        { title: "New Online Classroom", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
        <TextInputComponent
          label="Agenda"
          placeholder="Enter agenda"
          withAsterisk
          form={form}
          name="agenda"
        />

        <TextInputComponent
          label="Topic"
          placeholder="Enter topic"
          withAsterisk
          form={form}
          name="topic"
        />

        <DateTimeInputComponent
          placeholder="Choose start time"
          label="Start Time"
          withAsterisk
          form={form}
          name="start_date"
        />

        <TextInputComponent
          label="Meeting ID"
          placeholder="Enter Meeting ID"
          withAsterisk
          form={form}
          name="meeting_id"
        />

        <TextInputComponent
          label="Meeting URL"
          placeholder="Enter Meeting URL"
          withAsterisk
          form={form}
          name="meeting_url"
        />

        <TextInputComponent
          label="Meeting Password"
          placeholder="Enter Meeting password"
          withAsterisk
          form={form}
          name="meeting_password"
        />

        <div className="md:col-span-2 col-span-1">
          <GradeSectionSubject
            form={form}
            asterisk={{
              grade: true,
              subject: true,
            }}
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default withPermissions(Create, banRoles.zoom_meetings);
