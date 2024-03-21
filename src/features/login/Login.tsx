import MyButton from "@/components/buttons/MyButton";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import { Checkbox } from "@mantine/core";

const Login = () => {
  return (
    <div className="w-full min-h-screen bg-blue-500 flex justify-center items-center">
      <div className="max-w-[420px] flex-1 px-5 py-8 bg-white rounded-md shadow-md">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-3xl text-blue-500 font-[700]">Welcome Back!</h1>
          <p className="text-sm text-gray-600">
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

          <Checkbox label="Remember Me" />

          <MyButton>Login</MyButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
