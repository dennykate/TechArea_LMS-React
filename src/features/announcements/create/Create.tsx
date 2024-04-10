/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";
import TextInputComponent from "@/components/inputs/TextInputComponent";

import FileUpload from "@/components/inputs/FileUpload";
import TextEditorInput from "@/components/inputs/TextEditorInput";

const Create = () => {
  return (
    <FormLayout
      onSubmit={() => {}}
      title="Create Announcement"
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Announcement List", link: "/announcements/list" },
        { title: "New Announcement", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <div className="space-y-4">
        <TextInputComponent
          label="Title"
          placeholder="Enter title"
          withAsterisk
          // form={form}
          name="name"
        />
        <TextEditorInput label="Description" />
        <div className="!mt-6">
          <FileUpload type="image" />
        </div>
      </div>
    </FormLayout>
  );
};

export default Create;
