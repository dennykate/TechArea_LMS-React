import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";

const Create = () => {
  return (
    <FormLayout
      title="Create Grade"
      onSubmit={() => {}}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Grade List", link: "/grades/list" },
        { title: "New Grade", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <div className="w-full">
        <TextInputComponent
          label="Name"
          placeholder="Enter name"
          withAsterisk
        />
      </div>
    </FormLayout>
  );
};

export default Create;
