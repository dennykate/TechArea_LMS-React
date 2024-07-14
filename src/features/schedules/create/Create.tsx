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

const Create = () => {
  // const theme = useMantineTheme();
  // const [isFullDay, setIsFullDay] = useState<boolean>(false);

  const form = useForm<any>({
    initialValues: {
      title: "",
      type: "",
      start_date: new Date(),
      end_date: new Date(),
      description: "",
      role_id: "",
      grade_id: "",
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) => (value.length > 0 ? null : "Title is required"),
      type: (value: string) => (value.length > 0 ? null : "Type is required"),
      start_date: (value: string) => (value ? null : "Start date is required"),
      end_date: (value: string) => (value ? null : "End date is required"),
      role_id: (value: string) => (value ? null : "Role is required"),
      grade_id: (value: string, values: any) =>
        values?.role_id != "1" ? null : value ? null : "Grade is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();
  const onSubmitHandler = (values: any) => {
    // const newItem = {
    //   ...values,
    //   start_date: isFullDay
    //     ? dayjs(values.start_date).startOf("day").format("DD-MM-YYYY HH:mm")
    //     : dayjs(values.start_date).format("DD-MM-YYYY HH:mm"),
    //   end_date: isFullDay
    //     ? dayjs(values.end_date).endOf("day").format("DD-MM-YYYY HH:mm")
    //     : dayjs(values.end_date).format("DD-MM-YYYY HH:mm"),
    // };

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
      title="Create Schedule"
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Schedule List", link: "/schedules/list" },
        { title: "New Schedule", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <div className="grid md:grid-cols-2 grid-cols-1 sm:gap-7 gap-3">
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

        <div
          className={twMerge(
            form.values?.role_id != "1" ? "sm:col-span-2 col-span-1" : "col-span-1"
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

        {/* <div className="grid grid-cols-2 gap-4">
          <div className="pt-10">
            <Group position="left">
              <Switch
                checked={isFullDay}
                onChange={(event) => setIsFullDay(event.currentTarget.checked)}
                color="teal"
                size="md"
                label="Set as full day"
                thumbIcon={
                  isFullDay ? (
                    <IconCheck
                      size="0.8rem"
                      color={theme.colors.teal[theme.fn.primaryShade()]}
                      stroke={3}
                    />
                  ) : (
                    <IconX
                      size="0.8rem"
                      color={theme.colors.red[theme.fn.primaryShade()]}
                      stroke={3}
                    />
                  )
                }
              />
            </Group>
          </div>

          {form.values?.role_id == "1" && (
            <GradeSectionSubject form={form} usage={["grade"]} />
          )}
        </div> */}

        {form.values?.role_id == "1" && (
          <GradeSectionSubject form={form} usage={["grade"]} />
        )}

        <DateTimeInputComponent
          placeholder="Choose start date"
          label="Start Date"
          withAsterisk
          form={form}
          name="start_date"
        />
        <DateTimeInputComponent
          placeholder="Choose end date"
          label="End Date"
          withAsterisk
          form={form}
          name="end_date"
        />
        <div className="md:col-span-2 col-span-1">
          <TextAreaComponent
            label="Note"
            placeholder="Enter note"
            form={form}
            name="description"
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default withPermissions(Create, banRoles.schedules);
