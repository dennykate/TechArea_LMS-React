import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import SelectComponent from "@/components/inputs/SelectComponent";
import {
  gradeData,
  sectionData,
} from "@/features/accounts/students/create/data";
import TextEditorInput from "@/components/inputs/TextEditorInput";
import { useForm } from "@mantine/form";

const Create = () => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      grade: "",
      section: "",
    },
  });
  return (
    <FormLayout
      title="Create Assignment"
      onSubmit={() => {}}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Assignment List", link: "/assignments/list" },
        { title: "New Assignment", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Lorem espum",
      }}
    >
      <div className="w-full">
        <TextInputComponent
          label="Title"
          placeholder="Enter title"
          inputClassName="mb-3"
          withAsterisk
        />

        <TextEditorInput
          label="Description"
          content={form.values.description}
          handleChange={(val) => form.setFieldValue("description", val)}
          inputClassName="mb-5"
        />

        <div className=" ">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
            <SelectComponent
              label="Grade"
              placeholder="Select Grade"
              withAsterisk
              data={gradeData}
            />

            <SelectComponent
              label="Section"
              placeholder="Select Section"
              withAsterisk
              data={sectionData}
            />
          </div>
        </div>
      </div>
    </FormLayout>
  );
};

export default Create;
