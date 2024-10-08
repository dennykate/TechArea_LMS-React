/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";
import DateInputComponent from "@/components/inputs/DateInputComponent";
import ImageUpload from "@/components/inputs/ImageUpload";
import PasswordInputComponent from "@/components/inputs/PasswordInputComponent";
import SelectComponent from "@/components/inputs/SelectComponent";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import { useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useQuery from "@/hooks/useQuery";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";

const Edit = () => {
  const { teacherId } = useParams();
  const [profile, setProfile] = useState<File | undefined>();
  const [defaultImage, setDefaultImage] = useState<string | undefined>();

  const form = useForm<any>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      password_confirmation: "",
      date_of_birth: "",
      address: "",
    },
    validateInputOnBlur: true,
    validate: {
      name: (value: string) => (value?.length > 0 ? null : "Name is required"),
      phone: (value: string) =>
        value?.length > 0 ? null : "Phone is required",
      gender: (value: string) =>
        value?.length > 0 ? null : "Gender is required",
      password_confirmation: (value: string, values) =>
        values.password.length > 0
          ? value?.length > 0
            ? null
            : "This field is required"
          : null,
      date_of_birth: (value: string) =>
        value ? null : "Date of Birth is required",
      address: (value: string) =>
        value?.length > 0 ? null : "Address is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (values: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value === "") return;

      if (key === "date_of_birth") {
        formData.append(key, dayjs(value as Date).format("DD-MM-YYYY"));
        return;
      }
      formData.append(key, value as string);
    });

    if (profile) formData.append("profile", profile as File);

    onSubmit(`/users/${teacherId}`, formData, "POST", true);
  };

  const { isLoading: queryLoading } = useQuery(`users/${teacherId}`, (data) => {
    setDefaultImage(data?.profile);

    form.setFieldValue("name", data?.name);
    form.setFieldValue("email", data?.email);
    form.setFieldValue("phone", data?.phone);
    form.setFieldValue("gender", data?.gender);
    form.setFieldValue("address", data?.address);
    form.setFieldValue(
      "date_of_birth",
      data?.date_of_birth
        ? dayjs(data?.date_of_birth, "DD-MM-YYYY").toDate()
        : ""
    );
  });

  return (
    <FormLayout
      title="Edit Teacher"
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Teacher List", link: "/accounts/teachers/list" },
        { title: "Edit Teacher", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Better Change",
      }}
    >
      <ImageUpload
        defaultImage={defaultImage}
        label="Profile"
        setFile={setProfile}
        withAsterisk
      />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        <TextInputComponent
          label="Name"
          placeholder="Enter name"
          withAsterisk
          form={form}
          name="name"
        />

        <TextInputComponent
          label="Email"
          placeholder="Enter email"
          form={form}
          name="email"
        />

        <TextInputComponent
          label="Phone Number"
          placeholder="Enter phone number"
          withAsterisk
          form={form}
          name="phone"
        />

        <SelectComponent
          label="Gender"
          placeholder="Select gender"
          data={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          withAsterisk
          form={form}
          name="gender"
        />

        <PasswordInputComponent
          label="New Password"
          placeholder="Enter new password"
          withAsterisk
          form={form}
          name="password"
        />

        <PasswordInputComponent
          label="Confirm New Password"
          placeholder="Enter confrim new password"
          withAsterisk
          form={form}
          name="password_confirmation"
        />

        <div className="md:col-span-2 col-span-1">
          <DateInputComponent
            placeholder="Choose date"
            label="Date of birth"
            withAsterisk
            form={form}
            name="date_of_birth"
          />
        </div>

        <div className="md:col-span-2 col-span-1">
          <TextAreaComponent
            label="Address"
            placeholder="Enter address"
            withAsterisk
            form={form}
            name="address"
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default withPermissions(Edit, banRoles.accounts.teachers);
