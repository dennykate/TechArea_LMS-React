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
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import GradeSectionSubject from "@/components/common/GradeSectionSubject";
import useEncryptStorage from "@/hooks/use-encrypt-storage";

const Profile = () => {
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
    validate: {},
  });

  const [onSubmit, { isLoading }] = useMutate({
    navigateBack: false,
    callback: (data) => {
      remove("userInfo");

      set("userInfo", JSON.stringify(data));
    },
  });

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

    onSubmit(`/users/${userInfo?.id}`, formData, "POST", true);
  };

  console.log("user info => ", userInfo);

  useEffect(() => {
    if (userInfo) {
      setDefaultImage(userInfo?.profile);

      form.setFieldValue("name", userInfo?.name);
      form.setFieldValue("email", userInfo?.email);
      form.setFieldValue("phone", userInfo?.phone);
      form.setFieldValue("gender", userInfo?.gender);
      form.setFieldValue("address", userInfo?.address);
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
        title: "Loream Ispum",
      }}
    >
      <ImageUpload
        defaultImage={defaultImage}
        label="Profile"
        setFile={setProfile}
      />

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        <TextInputComponent
          label="Name"
          placeholder="Enter namee"
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
          form={form}
          name="gender"
        />

        <PasswordInputComponent
          label="Password"
          placeholder="Enter password"
          form={form}
          name="password"
        />

        <PasswordInputComponent
          label="Confirm Password"
          placeholder="Enter confrim password"
          form={form}
          name="password_confirmation"
        />

        <div className=" col-span-2">
          <GradeSectionSubject
            form={form}
            usage={["grade", "section"]}
            asterisk={{
              grade: true,
            }}
          />
        </div>

        <div className="md:col-span-2 col-span-1">
          <DateInputComponent
            placeholder="Choose date"
            label="Date of birth"
            form={form}
            name="date_of_birth"
          />
        </div>

        <div className="md:col-span-2 col-span-1">
          <TextAreaComponent
            label="Address"
            placeholder="Enter address"
            form={form}
            name="address"
          />
        </div>
      </div>
    </FormLayout>
  );
};

export default Profile;
