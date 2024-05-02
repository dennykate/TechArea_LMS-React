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
import toast from "react-hot-toast";
import dayjs from "dayjs";

const Create = () => {
  const [profile, setProfile] = useState<File | undefined>();

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
      name: (value: string) => (value.length > 0 ? null : "Name is required"),
      phone: (value: string) => (value.length > 0 ? null : "Phone is required"),
      gender: (value: string) =>
        value.length > 0 ? null : "Gender is required",
      password: (value: string) =>
        value.length > 0 ? null : "Password is required",
      password_confirmation: (value: string, values: any) =>
        value === values.password ? null : "Password doesn't match",
      date_of_birth: (value: string) =>
        value ? null : "Date of Birth is required",
      address: (value: string) =>
        value.length > 0 ? null : "Address is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (values: any) => {
    if (!profile) return toast.error("Profile is required");

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "date_of_birth") {
        formData.append(key, dayjs(value as Date).format("DD-MM-YYYY"));
        return;
      }
      formData.append(key, value as string);
    });

    formData.append("profile", profile as File);
    formData.append("role_id", "2");

    onSubmit("/users", formData, "POST", true);
  };

  return (
    <FormLayout
      title="Create Teacher"
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Teacher List", link: "/accounts/teachers/list" },
        { title: "New Teacher", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
      }}
    >
      <ImageUpload label="Profile" setFile={setProfile} withAsterisk />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        <TextInputComponent
          label="Name"
          placeholder="Enter namee"
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
          label="Password"
          placeholder="Enter password"
          withAsterisk
          form={form}
          name="password"
        />

        <PasswordInputComponent
          label="Confirm Password"
          placeholder="Enter confrim password"
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

export default Create;
