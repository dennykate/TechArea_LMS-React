/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import useQuery from "@/hooks/useQuery";
import { useParams } from "react-router-dom";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Edit = () => {
  const { gradeId } = useParams();

  const form = useForm<any>({
    initialValues: {
      name: "",
    },
    validateInputOnBlur: true,
    validate: {
      name: (value: string) =>
        value.length > 0 ? null : "Grade name is required",
    },
  });

  const { isLoading: queryLoading } = useQuery(`/grades/${gradeId}`, (data) => {
    form.setFieldValue("name", data?.name);
  });

  const [onSubmit, { isLoading }] = useMutate();

  return (
    <FormLayout
      title="Edit Grade"
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) =>
        onSubmit(`/grades/${gradeId}`, values, "PUT")
      )}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Grade List", link: "/grades/list" },
        { title: "Edit Grade", link: "" },
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
          form={form}
          name="name"
        />
      </div>
    </FormLayout>
  );
};

export default withPermissions(Edit, banRoles.grades);
