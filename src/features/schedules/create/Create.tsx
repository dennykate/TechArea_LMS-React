/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import SelectComponent from "@/components/inputs/SelectComponent";
import DateTimeInputComponent from "@/components/inputs/DateTimeInputComponent";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import dayjs from "dayjs";
import { roleData } from "@/data/roles";
// import { useState } from "react";
// import { Group, Switch, useMantineTheme } from "@mantine/core";
// import { IconCheck, IconX } from "@tabler/icons-react";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import { twMerge } from "tailwind-merge";

interface PropsType {
  startDate?: Date;
  close?: () => void;
}
const Create = ({ startDate, close }: PropsType) => {
  // const theme = useMantineTheme();
  // const [isFullDay, setIsFullDay] = useState<boolean>(false);

  const form = useForm<any>({
    initialValues: {
      title: "",
      type: "",
      start_date: startDate ?? new Date(),
      end_date: startDate ?? new Date(),
      description: "",
      role_id: "",
      grade_id: "",
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) =>
        value?.length > 0 ? null : "Title is required",
      type: (value: string) => (value?.length > 0 ? null : "Type is required"),
      start_date: (value: string) => (value ? null : "Start date is required"),
      end_date: (value: string) => (value ? null : "End date is required"),
      role_id: (value: string) => (value ? null : "Role is required"),
      grade_id: (value: string, values: any) =>
        values?.role_id != "1" ? null : value ? null : "Grade is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate({
    navigateBack: false,
    callback: () => {
      close && close();
    },
  });
  const onSubmitHandler = (values: any) => {
    const newItem = {
      ...values,
      start_date: dayjs(values.start_date).format("DD-MM-YYYY HH:mm"),
      end_date: dayjs(values.end_date).format("DD-MM-YYYY HH:mm"),
    };
    onSubmit("/academic-calendar-events", newItem);
  };
  //
  return (
    <FormLayout
      submitLoading={isLoading}
      isModal
      wrapperClassName="!p-0"
      onCancel={close}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
    >
      <div className="grid md:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
        <TextInputComponent
          label="Title"
          placeholder="Enter title"
          withAsterisk
          form={form}
          name="title"
        />
        <SelectComponent
          label="Type"
          placeholder="Select type"
          data={[
            { label: "Exam", value: "exams" },
            { label: "Meeting", value: "meetings" },
            { label: "Holiday", value: "holidays" },
            { label: "Event", value: "events" },
          ]}
          withAsterisk
          form={form}
          name="type"
        />

        <DateTimeInputComponent
          placeholder="Choose start date"
          label="Start Date"
          withAsterisk
          form={form}
          name="start_date"
          className="whitespace-nowrap"
        />
        <DateTimeInputComponent
          placeholder="Choose end date"
          label="End Date"
          withAsterisk
          form={form}
          className="whitespace-nowrap"
          name="end_date"
        />

        <div
          className={twMerge(
            form.values?.role_id != "1"
              ? "sm:col-span-2 col-span-1"
              : "col-span-1"
          )}
        >
          <SelectComponent
            label="Role"
            placeholder="Select role"
            data={roleData}
            withAsterisk
            form={form}
            name="role_id"
          />
        </div>

        {form.values?.role_id == "1" && (
          <GradeSectionSubject form={form} usage={["grade"]} />
        )}

        <div className="md:col-span-2 col-span-1">
          <TextAreaComponent
            label="Note"
            placeholder="Enter note"
            form={form}
            minRows={6}
            name="description"
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default withPermissions(Create, banRoles.schedules);
