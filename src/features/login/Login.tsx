/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Popover, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { BsQuestionCircle } from "react-icons/bs";

import MyButton from "@/components/buttons/MyButton";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import useMutate from "@/hooks/useMutate";
import { useForm } from "@mantine/form";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import PasswordInputComponent from "@/components/inputs/PasswordInputComponent";

const Login = () => {
  const navigate = useNavigate();
  const { set } = useEncryptStorage();

  const form = useForm<any>({
    initialValues: {
      phone: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: {
      phone: (value: string) =>
        value.length > 0 ? null : "Phone number is required",
      password: (value: string) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const onSuccess = (value: any) => {
    set("token", value.token);
    set("role", value.role);
    set("userInfo", JSON.stringify(value.userInfo));

    return navigate("/dashboard");
  };

  const [onSubmit, { isLoading }] = useMutate({
    callback: onSuccess,
    navigateBack: false,
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-primary-200 to-primary-600 flex justify-center items-center">
      <div className="max-w-[420px] flex-1 px-5 py-8 bg-white rounded-md shadow-md mx-2">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-3xl text-primary font-[700]">Welcome!</h1>
          <p className="text-sm text-gray-600 text-center">
            Enter your phone number and passwort to login
          </p>
        </div>

        <form
          onSubmit={form.onSubmit((values) => onSubmit("/login", values))}
          className="space-y-4 mt-6"
        >
          <TextInputComponent
            placeholder="Enter your phone number"
            label="Phone Number"
            form={form}
            name="phone"
          />

          <PasswordInputComponent
            placeholder="Enter your password"
            label="Password"
            form={form}
            name="password"
          />

          <div className="flex justify-between items-center">
            <Checkbox
              label="Remember Me"
              classNames={{
                label: "sm:text-sm text-xs",
              }}
            />

            <Popover position="top-end" width={200} withArrow shadow="md">
              <Popover.Target>
                <div className="flex gap-1 items-center cursor-pointer">
                  <p className="sm:text-sm text-xs">Forget Password </p>{" "}
                  <BsQuestionCircle size={16} />
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="sm">
                  If you forgot your current password, please contact school
                  admin team. You can{" "}
                  <Link
                    to="tel:099655704594"
                    className="underline text-blue-500"
                  >
                    contact here
                  </Link>
                </Text>
              </Popover.Dropdown>
            </Popover>
          </div>

          <MyButton
            loading={isLoading}
            type="submit"
            className="w-full !mt-6 mb-6"
          >
            Login
          </MyButton>
          <div className="w-full flex justify-center">
            <Link
              to={"/"}
              className="underline sm:text-sm text-xs text-primary"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
