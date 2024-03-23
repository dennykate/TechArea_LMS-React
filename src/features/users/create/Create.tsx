import FormLayout from "@/components/forms/FormLayout";
import DateInputComponent from "@/components/inputs/DateInputComponent";
import ImageUpload from "@/components/inputs/ImageUpload";
import PasswordInputComponent from "@/components/inputs/PasswordInputComponent";
import SelectComponent from "@/components/inputs/SelectComponent";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";

const Create = () => {
  return (
    <FormLayout
      title="Create Student"
      onSubmit={() => {}}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Student List", link: "/students/list" },
        { title: "New Student", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <ImageUpload label="Profile" setFile={() => {}} withAsterisk />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <TextInputComponent
          label="Name"
          placeholder="Enter name"
          withAsterisk
        />

        <TextInputComponent
          label="Email"
          placeholder="Enter email"
          withAsterisk
        />

        <TextInputComponent
          label="Phone Number"
          placeholder="Enter phone number"
          withAsterisk
        />

        <SelectComponent
          label="Gender"
          placeholder="Select gender"
          data={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          withAsterisk
        />

        <PasswordInputComponent
          label="Password"
          placeholder="Enter password"
          withAsterisk
        />

        <PasswordInputComponent
          label="Confirm Password"
          placeholder="Enter confrim password"
          withAsterisk
        />

        <div className="md:col-span-2 col-span-1">
          <DateInputComponent
            placeholder="Choose date"
            label="Date of birth"
            withAsterisk
          />
        </div>

        <div className="md:col-span-2 col-span-1">
          <TextAreaComponent
            label="Address"
            placeholder="Enter address"
            withAsterisk
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default Create;
