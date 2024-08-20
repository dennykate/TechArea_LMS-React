/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Create = () => {
  const form = useForm<any>({
    initialValues: {
      name: "",
    },
    validateInputOnBlur: true,
    validate: {
      name: (value: string) =>
        value?.length > 0 ? null : "Grade name is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  return (
    <FormLayout
      title="Create Grade"
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmit("/grades", values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Grade List", link: "/grades/list" },
        { title: "New Grade", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Better Change",
      }}
    >
      <div className="w-full">
        <TextInputComponent
          label="Name"
          placeholder="Enter name"
          withAsterisk
          form={form}
          name="name"
        />
      </div>
    </FormLayout>
  );
};

export default withPermissions(Create, banRoles.grades);
