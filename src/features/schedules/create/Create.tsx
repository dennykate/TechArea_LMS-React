import FormLayout from "@/components/layouts/FormLayout";

import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import SelectComponent from "@/components/inputs/SelectComponent";
import DateTimeInputComponent from "@/components/inputs/DateTimeInputComponent";

const Create = () => {
  return (
    <FormLayout
      title="Create Schedule"
      onSubmit={() => {}}
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
        <TextInputComponent
          label="Title"
          placeholder="Enter title"
          withAsterisk
        />
        <SelectComponent
          label="Type"
          placeholder="Select type"
          data={[
            { label: "Exam", value: "exam" },
            { label: "Meeting", value: "meeting" },
          ]}
          withAsterisk
        />
        <DateTimeInputComponent
          placeholder="Choose start date"
          label="Start Date"
          withAsterisk
        />
        <DateTimeInputComponent
          placeholder="Choose end date"
          label="End Date"
          withAsterisk
        />
      </div>
      <div className="md:col-span-2 col-span-1">
        <TextAreaComponent
          label="Description"
          placeholder="Enter description"
        />
      </div>
    </FormLayout>
  );
};

export default Create;
