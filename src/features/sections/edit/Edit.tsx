/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";

import TextInputComponent from "@/components/inputs/TextInputComponent";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import { useParams } from "react-router-dom";
import useQuery from "@/hooks/useQuery";

const Edit = () => {
  const { sectionId } = useParams();

  const form = useForm<any>({
    initialValues: {
      name: "",
    },
    validateInputOnBlur: true,
    validate: {
      name: (value: string) =>
        value?.length > 0 ? null : "Section name is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const { isLoading: queryLoading } = useQuery(
    `/sections/${sectionId}`,
    (data) => {
      form.setFieldValue("name", data.name);
    }
  );

  return (
    <FormLayout
      title="Edit Class"
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) =>
        onSubmit(`/sections/${sectionId}`, values, "PUT")
      )}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Grade List", link: "/grades" },
        { title: "Grade Details", link: `/grades/details/${sectionId}` },
        { title: "Edit Class", link: "" },
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

export default Edit;
