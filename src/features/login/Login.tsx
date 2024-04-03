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
    <div className="w-full min-h-screen bg-gradient-to-br from-primary-200 to-primary-600 flex justify-center items-center">
      <div className="max-w-[420px] flex-1 px-5 py-8 bg-white rounded-md shadow-md mx-2">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-3xl text-primary font-[700]">Welcome!</h1>
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

          <MyButton onClick={onSubmitHandler} className="w-full !mt-6 mb-6">
            Login
          </MyButton>
          <div className="w-full flex justify-center">
            <Link to={"/"} className="underline sm:text-sm text-xs text-primary">
              Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
