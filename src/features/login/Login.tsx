import { Checkbox, Popover, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useEncryptStorage } from "use-encrypt-storage";
import { BsQuestionCircle } from "react-icons/bs";

import MyButton from "@/components/buttons/MyButton";
import TextInputComponent from "@/components/inputs/TextInputComponent";

const Login = () => {
  const navigate = useNavigate();
  const { set } = useEncryptStorage();

  const onSubmitHandler = () => {
    set("name", "techarea");

    navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-screen bg-primary-600 flex justify-center items-center">
      <div className="max-w-[420px] flex-1 px-5 py-8 bg-white rounded-md shadow-md mx-2">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-3xl text-primary-500 font-[700]">
            Welcome Back!
          </h1>
          <p className="text-sm text-gray-600 text-center">
            Enter your phone number and passwort to login
          </p>
        </div>

        <form className="space-y-4 mt-6">
          <TextInputComponent
            placeholder="Enter your phone number"
            label="Phone Number"
          />

          <TextInputComponent
            placeholder="Enter your password"
            label="Password"
          />

          <div className="flex justify-between items-center">
            <Checkbox
              label="Remember Me"
              classNames={{
                label: "sm:text-[16px] text-[14px]",
              }}
            />

            <div className="flex gap-1 items-center">
              <p className="sm:text-[16px] text-[14px]">Forget Password </p>
              <Popover position="top-end" width={200} withArrow shadow="md">
                <Popover.Target>
                  <BsQuestionCircle size={16} />
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
          </div>

          <MyButton onClick={onSubmitHandler} className="w-full !mt-6">
            Login
          </MyButton>

          <div className="w-full mt-2 text-center">
            <Link to="/" className="text-sm underline ">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
