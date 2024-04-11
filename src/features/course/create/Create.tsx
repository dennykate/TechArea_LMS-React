import FormLayout from "@/components/layouts/FormLayout";
import SelectComponent from "@/components/inputs/SelectComponent";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import FileUplaod from "@/components/inputs/FileUpload";
import {
  gradeData,
  sectionData,
} from "@/features/accounts/students/create/data";

const Create = () => {
  return (
    <FormLayout
      title="Create Course"
      onSubmit={() => {}}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Course List", link: "/courses/list" },
        { title: "New Course", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <FileUplaod />

      <div className="flex flex-col gap-4 mt-4">
        <TextInputComponent
          label="Name"
          placeholder="Enter name"
          withAsterisk
        />

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
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

        <TextAreaComponent
          label="Description"
          placeholder="Enter description"
          withAsterisk
        />
      </div>
    </FormLayout>
  );
};

export default Create;
