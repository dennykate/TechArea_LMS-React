/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import SelectComponent from "@/components/inputs/SelectComponent";
import DateTimeInputComponent from "@/components/inputs/DateTimeInputComponent";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import dayjs from "dayjs";
import useQuery from "@/hooks/useQuery";
import { useParams } from "react-router-dom";
import { roleData } from "@/data/roles";

const Edit = () => {
  const { scheduleId } = useParams();
  const form = useForm<any>({
    initialValues: {
      title: "",
      type: "",
      start_date: "",
      end_date: "",
      description: "",
      role_id: "",
    },
    validateInputOnBlur: true,
    validate: {
      title: (value: string) => (value.length > 0 ? null : "Title is required"),
      type: (value: string) => (value.length > 0 ? null : "Type is required"),
      start_date: (value: string) => (value ? null : "Start date is required"),
      end_date: (value: string) => (value ? null : "End date is required"),
      role_id: (value: string) => (value ? null : "Role is required"),
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const { isLoading: queryLoading } = useQuery(
    `/academic-calendar-events/${scheduleId}`,
    (data) => {
      form.setValues({
        ...data,
        role_id: JSON.stringify(data?.role_id),
        start_date: dayjs(data?.start_date, "DD MMM YYYY hh:mm A").toDate(),
        end_date: dayjs(data?.end_date, "DD MMM YYYY hh:mm A").toDate(),
      });
    }
  );
  const onSubmitHandler = (values: any) => {
    const newItem = {
      ...values,
      start_date: dayjs(values.start_date).format("DD-MM-YYYY HH:mm"),
      end_date: dayjs(values.end_date).format("DD-MM-YYYY HH:mm"),
    };
    onSubmit(`/academic-calendar-events/${scheduleId}`, newItem, "PUT");
  };

  return (
    <FormLayout
      title="Edit Schedule"
      queryLoading={queryLoading}
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
      <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
        <div className="md:col-span-2 col-span-1">
          <TextInputComponent
            label="Title"
            placeholder="Enter title"
            withAsterisk
            form={form}
            name="title"
          />
        </div>
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
        <SelectComponent
          label="Role"
          placeholder="Select role"
          data={roleData}
          withAsterisk
          form={form}
          name="role_id"
        />
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
            label="Description"
            placeholder="Enter description"
            form={form}
            name="description"
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default Edit;
