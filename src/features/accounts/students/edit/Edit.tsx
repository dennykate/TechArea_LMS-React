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
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import useQuery from "@/hooks/useQuery";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { studentId } = useParams();
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
      learning_expire_at: "",
      address: "",
      grade_id: "",
      section_id: "",
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
            ? value != values.password
              ? "Password doesn't match"
              : null
            : "This field is required"
          : null,
      date_of_birth: (value: string) =>
        value ? null : "Date of Birth is required",
      learning_expire_at: (value: string) =>
        value ? null : "Learning Expired Date is required",
      address: (value: string) =>
        value?.length > 0 ? null : "Address is required",
      grade_id: (value: string) =>
        value?.length > 0 ? null : "Grade is required",
    },
  });

  const [onSubmit, { isLoading }] = useMutate();

  const onSubmitHandler = (values: any) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "date_of_birth" || key === "learning_expire_at") {
        formData.append(key, dayjs(value as Date).format("DD-MM-YYYY"));
        return;
      }
      formData.append(key, value as string);
    });

    formData.append("profile", profile as File);

    onSubmit(`/users/${studentId}`, formData, "POST", true);
  };

  const { isLoading: queryLoading } = useQuery(`users/${studentId}`, (data) => {
    setDefaultImage(data?.profile);

    form.setFieldValue("name", data?.name);
    form.setFieldValue("email", data?.email);
    form.setFieldValue("phone", data?.phone);
    form.setFieldValue("gender", data?.gender);
    form.setFieldValue("address", data?.address);
    form.setFieldValue("grade_id", data?.grade_id);
    form.setFieldValue("section_id", data?.section_id);
    form.setFieldValue(
      "date_of_birth",
      data?.date_of_birth
        ? dayjs(data?.date_of_birth, "DD-MM-YYYY").toDate()
        : ""
    );
    form.setFieldValue(
      "learning_expire_at",
      data?.learning_expire_at
        ? dayjs(data?.learning_expire_at, "DD-MM-YYYY").toDate()
        : ""
    );
  });

  return (
    <FormLayout
      title="Edit Student"
      queryLoading={queryLoading}
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      linkItems={[
        { title: "Dashboard", link: "/dashboard" },
        { title: "Student List", link: "/accounts/students/list" },
        { title: "Edit Student", link: "" },
      ]}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Loream Ispum",
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
          label="New Password ( Optional )"
          placeholder="Enter New password"
          form={form}
          name="password"
        />

        <PasswordInputComponent
          label="Confirm New Password ( Optional )"
          placeholder="Enter confrim password"
          form={form}
          name="password_confirmation"
        />

        <div className="md:col-span-2 col-span-1">
          <GradeSectionSubject
            form={form}
            usage={["grade", "section"]}
            asterisk={{
              grade: true,
            }}
          />
        </div>

        <DateInputComponent
          placeholder="Choose date"
          label="Date of birth"
          withAsterisk
          form={form}
          name="date_of_birth"
        />
        <DateInputComponent
          placeholder="Choose date"
          label="Learning Expired Date"
          withAsterisk
          form={form}
          name="learning_expire_at"
        />

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

export default Edit;
