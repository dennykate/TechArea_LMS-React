/* eslint-disable @typescript-eslint/no-explicit-any */
import FormLayout from "@/components/layouts/FormLayout";
import ImageUpload from "@/components/inputs/ImageUpload";
import PasswordInputComponent from "@/components/inputs/PasswordInputComponent";
import TextAreaComponent from "@/components/inputs/TextAreaComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import { useForm } from "@mantine/form";
import useMutate from "@/hooks/useMutate";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<File | undefined>();
  const [defaultImage, setDefaultImage] = useState<string>("");
  const { get, remove, set } = useEncryptStorage();

  const userInfo = useMemo(() => JSON.parse(get("userInfo") as string), []);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      password_confirmation: "",
      date_of_birth: "",
      address: "",
      grade_id: "",
      section_id: "",
    },
    validateInputOnBlur: true,
    validate: {
      password_confirmation: (value: string, values) =>
        value === values.password ? null : "Password doesn't match",
    },
  });

  const [onSubmit, { isLoading }] = useMutate({
    navigateBack: false,
    callback: (data) => {
      remove("userInfo");

      set("userInfo", JSON.stringify(data));

      navigate("/dashboard");
    },
  });

  const onSubmitHandler = (values: any) => {
    // if (!profile) return toast.error("Profile is required");

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (!value) return;

      if (key === "date_of_birth") {
        formData.append(key, dayjs(value as Date).format("DD-MM-YYYY"));
        return;
      }
      formData.append(key, value as string);
    });

    formData.append("profile", profile as File);

    onSubmit(`/users/${userInfo?.id}`, formData, "POST", true);
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.profile) {
        setDefaultImage(userInfo?.profile);
      }

      form.setFieldValue("name", userInfo?.name);
      form.setFieldValue("email", userInfo?.email);
      form.setFieldValue("phone", userInfo?.phone);
      form.setFieldValue("gender", userInfo?.gender);
      form.setFieldValue("address", userInfo?.address ? userInfo?.address : "");
      form.setFieldValue("grade_id", userInfo?.grade_id);
      form.setFieldValue("section_id", userInfo?.section_id);
      form.setFieldValue(
        "date_of_birth",
        userInfo?.date_of_birth
          ? dayjs(userInfo?.date_of_birth, "DD-MM-YYYY").toDate()
          : ("" as any)
      );
    }
  }, [userInfo]);

  return (
    <FormLayout
      title="Account Profile"
      submitLoading={isLoading}
      onSubmit={form.onSubmit((values) => onSubmitHandler(values))}
      header={{
        image:
          "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Better Change",
      }}
    >
      {userInfo?.role_id != "1" && (
        <ImageUpload
          defaultImage={defaultImage}
          label="Profile"
          setFile={setProfile}
        />
      )}

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {userInfo?.role_id != "1" && (
          <>
            <TextInputComponent
              label="Name"
              placeholder="Enter name"
              form={form}
              name="name"
            />

            <TextInputComponent
              label="Email"
              placeholder="Enter email"
              form={form}
              name="email"
            />

            <div className="md:col-span-2 col-span-1">
              <TextInputComponent
                label="Phone Number"
                placeholder="Enter phone number"
                form={form}
                name="phone"
              />
            </div>
          </>
        )}

        <PasswordInputComponent
          label="New Password"
          placeholder="Enter new password"
          form={form}
          name="password"
        />

        <PasswordInputComponent
          label="Confirm New Password"
          placeholder="Enter confrim new password"
          form={form}
          name="password_confirmation"
        />

        {userInfo?.role_id != "1" && (
          <div className="md:col-span-2 col-span-1">
            <TextAreaComponent
              label="Address"
              placeholder="Enter address"
              form={form}
              name="address"
            />
          </div>
        )}
      </div>
    </FormLayout>
  );
};

export default Profile;
