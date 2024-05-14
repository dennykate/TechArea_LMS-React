/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import DateTimeInputComponent from "@/components/inputs/DateTimeInputComponent";

// import { Group, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import useMutate from "@/hooks/useMutate";
import dayjs from "dayjs";
import useQuery from "@/hooks/useQuery";
import { useParams } from "react-router-dom";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Edit = () => {
  const { zoomMeetingId } = useParams();

  const form = useForm({
    initialValues: {
      agenda: "",
      topic: "",
      start_date: new Date(),
      meeting_id: "",
      meeting_url: "",
      meeting_password: "",
      grade_id: "",
      section_id: "",
      subject_id: "",
    },
    validateInputOnBlur: true,
    validate: {
      agenda: (value: string) =>
        value.length > 0 ? null : "Agenda is required",
      topic: (value: string) => (value.length > 0 ? null : "Topic is required"),
      start_date: (value) => (value ? null : "Start Date is required"),
      meeting_id: (value: string) =>
        value.length > 0 ? null : "Meeting ID is required",
      meeting_url: (value: string) =>
        value.length > 0 ? null : "Meeting URL is required",
      meeting_password: (value: string) =>
        value.length > 0 ? null : "Meeting Password is required",
      grade_id: (value: string) =>
        value.length > 0 ? null : "Grade ID is required",
      // section_id: (value: string) =>
      //   value.length > 0 ? null : "Section ID is required",
      subject_id: (value: string) =>
        value.length > 0 ? null : "Subject ID is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate({ navigateBack: true });

  const onSubmitHandler = (data: any) => {
    onSubmit(
      `/zooms/${zoomMeetingId}`,
      {
        ...data,
        start_time: dayjs(data?.start_date).format("D-M-YYYY HH:mm"),
      },
      "PUT"
    );
  };

  const { isLoading: queryLoading } = useQuery(
    `/zooms/${zoomMeetingId}`,
    (data) => {
      form.setFieldValue("agenda", data?.agenda);
      form.setFieldValue("topic", data?.topic);
      form.setFieldValue("meeting_id", data?.meeting_id);
      form.setFieldValue("meeting_url", data?.meeting_url);
      form.setFieldValue("meeting_password", data?.meeting_password);
      form.setFieldValue("grade_id", data?.grade_id);
      form.setFieldValue("section_id", data?.section_id);
      form.setFieldValue("subject_id", data?.subject_id);
      form.setFieldValue(
        "start_date",
        dayjs(data?.start_time, "DD MMM YYYY hh:mm A").toDate()
      );
    }
  );

  return (
    <FormLayout
      title="Edit Zoom Meeting"
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Zoom Meeting List", link: "/zoom-meetings/list" },
        { title: "New Zoom Meeting", link: "" },
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
          placeholder="Choose start date"
          label="Start Date"
          withAsterisk
          form={form}
          name="start_date"
        />

        <TextInputComponent
          label="Meeting ID"
          placeholder="Enter meeting id"
          withAsterisk
          form={form}
          name="meeting_id"
        />

        <TextInputComponent
          label="Meeting URL"
          placeholder="Enter meeting url"
          withAsterisk
          form={form}
          name="meeting_url"
        />

        <TextInputComponent
          label="Meeting Password"
          placeholder="Enter meeting password"
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

export default withPermissions(Edit, banRoles.zoom_meetings);
