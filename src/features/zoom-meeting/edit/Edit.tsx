import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import SelectComponent from "@/components/inputs/SelectComponent";
import DateTimeInputComponent from "@/components/inputs/DateTimeInputComponent";
import {
  gradeData,
  sectionData,
} from "@/features/accounts/students/create/data";
import NumberInputComponent from "@/components/inputs/NumberInputComponent";
import {
  recurrenceOccurence,
  recurrenceRepeactInterval,
  recurrenceType,
} from "./data";
import { Group, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";

const Create = () => {
  const form = useForm({
    initialValues: {
      end_date_type: "date",
      type: "2",
    },
  });

  return (
    <FormLayout
      title="Create Schedule"
      onSubmit={() => {}}
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
        />

        <TextInputComponent
          label="Topic"
          placeholder="Enter topic"
          withAsterisk
        />

        <NumberInputComponent
          placeholder="Duration ( in minutes )"
          label="Duration"
          withAsterisk
        />

        <DateTimeInputComponent
          placeholder="Choose start date"
          label="Start Date"
          withAsterisk
        />

        <TextInputComponent
          label="Password"
          placeholder="Enter password"
          withAsterisk
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

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 col-span-2">
          <SelectComponent
            label="Grade"
            placeholder="Select grade"
            data={gradeData}
            withAsterisk
          />
          <SelectComponent
            label="Section"
            placeholder="Select section"
            data={sectionData}
            withAsterisk
          />
          <SelectComponent
            label="Subject"
            placeholder="Select section"
            data={sectionData}
            withAsterisk
          />
        </div>

        {form.values.type == "8" && (
          <>
            <SelectComponent
              label="Recurrence"
              placeholder="Select recurrence type"
              data={recurrenceType}
              withAsterisk
            />
            <SelectComponent
              label="Recurrence Repeat Interval"
              placeholder="Select recurrence repeat interval ( in days )"
              data={recurrenceRepeactInterval}
              withAsterisk
            />
            <Radio.Group
              name="end_date_type"
              label="End Date Type"
              withAsterisk
              {...form.getInputProps("end_date_type")}
            >
              <Group mt="xs">
                <Radio value="date" label="Date" />
                <Radio value="count" label="Count" />
              </Group>
            </Radio.Group>
            {form.values.end_date_type === "date" ? (
              <DateTimeInputComponent
                placeholder="Choose end date"
                label="End Date"
                withAsterisk
              />
            ) : (
              <SelectComponent
                label="Occurence Count"
                placeholder="Select recurrence count"
                data={recurrenceOccurence}
                withAsterisk
              />
            )}
          </>
        )}
      </div>
    </FormLayout>
  );
};

export default Create;
