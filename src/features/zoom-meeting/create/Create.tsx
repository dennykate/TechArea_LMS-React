/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import SelectComponent from "@/components/inputs/SelectComponent";
import DateTimeInputComponent from "@/components/inputs/DateTimeInputComponent";

import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import {
  recurrenceOccurence,
  recurrenceRepeactInterval,
  recurrenceType,
} from "./data";
import { Group, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import useMutate from "@/hooks/useMutate";
import dayjs from "dayjs";

const Create = () => {
  const form = useForm({
    initialValues: {
      type: "2",
      agenda: "",
      topic: "",
      duration: 9,
      start_date: new Date(),
      password: "",
      grade_id: "",
      section_id: "",
      subject_id: "",
      recurrence_type: "",
      recurrence_repeat_interval: "",
      recurrence_end_type: "",
      recurrence_end_date_time: new Date(),
      recurrence_end_time: "",
    },
    validateInputOnBlur: true,
    validate: {
      agenda: (value: string) =>
        value.length > 0 ? null : "Agenda is required",
      topic: (value: string) => (value.length > 0 ? null : "Topic is required"),
      duration: (value: number) => (value > 0 ? null : "Duration is required"),
      start_date: (value) => (value ? null : "Start Date is required"),
      password: (value: string) =>
        value.length > 0 ? null : "Password is required",
      grade_id: (value: string) =>
        value.length > 0 ? null : "Grade ID is required",
      section_id: (value: string) =>
        value.length > 0 ? null : "Section ID is required",
      subject_id: (value: string) =>
        value.length > 0 ? null : "Subject ID is required",
      recurrence_type: (value: string, values) =>
        values?.type != "8"
          ? null
          : value.length > 0
          ? null
          : "Recurrence Type is required",
      recurrence_repeat_interval: (value: string, values) =>
        values?.type != "8"
          ? null
          : value.length > 0
          ? null
          : "Recurrence Repeat Inteval is required",
      recurrence_end_type: (value: string, values) =>
        values?.type != "8"
          ? null
          : value.length > 0
          ? null
          : "Recurrence End Type is required",
      recurrence_end_date_time: (value, values) =>
        values?.recurrence_end_type != "date"
          ? null
          : values?.type != "8"
          ? null
          : value
          ? null
          : "Recurrence End Date Time is required",
      recurrence_end_time: (value: string, values) =>
        values?.recurrence_end_type != "count"
          ? null
          : values?.type != "8"
          ? null
          : value.length > 0
          ? null
          : "Recurrence End Time is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (data: any) => {
    onSubmit("/zooms", {
      ...data,
      start_time: dayjs(data?.start_date).format("D-M-YYYY HH:mm"),
      recurrence_end_date_time: dayjs(data?.start_date).format(
        "D-M-YYYY HH:mm"
      ),
    });
  };

  return (
    <FormLayout
      title="Create Schedule"
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

        <NumberInputComponent
          placeholder="Duration ( in minutes )"
          label="Duration"
          withAsterisk
          form={form}
          name="duration"
        />

        <DateTimeInputComponent
          placeholder="Choose start date"
          label="Start Date"
          withAsterisk
          form={form}
          name="start_date"
        />

        <TextInputComponent
          label="Password"
          placeholder="Enter password"
          withAsterisk
          form={form}
          name="password"
        />

        <SelectComponent
          label="Type"
          placeholder="Select type"
          data={[
            { label: "Instant", value: "1" },
            { label: "Schedule", value: "2" },
            { label: "Recurrence", value: "8" },
          ]}
          withAsterisk
          form={form}
          name="type"
        />

        <div className="md:col-span-2 col-span-1">
          <GradeSectionSubject form={form} />
        </div>

        {form.values.type == "8" && (
          <>
            <SelectComponent
              label="Recurrence"
              placeholder="Select recurrence type"
              data={recurrenceType}
              withAsterisk
              form={form}
              name="recurrence_type"
            />
            <SelectComponent
              label="Recurrence Repeat Interval"
              placeholder="Select recurrence repeat interval ( in days )"
              data={recurrenceRepeactInterval}
              withAsterisk
              form={form}
              name="recurrence_repeat_interval"
            />
            <Radio.Group
              name="end_date_type"
              label="End Date Type"
              withAsterisk
              {...form.getInputProps("recurrence_end_type")}
            >
              <Group mt="xs">
                <Radio value="date" label="Date" />
                <Radio value="count" label="Count" />
              </Group>
            </Radio.Group>
            {form.values.recurrence_end_type === "date" ? (
              <DateTimeInputComponent
                placeholder="Choose end date"
                label="End Date"
                withAsterisk
                form={form}
                name="recurrence_end_date_time"
              />
            ) : (
              <SelectComponent
                label="Occurence Count"
                placeholder="Select recurrence count"
                data={recurrenceOccurence}
                withAsterisk
                form={form}
                name="recurrence_end_time"
              />
            )}
          </>
        )}
      </div>
    </FormLayout>
  );
};

export default Create;
