import { Button, ButtonProps } from "@mantine/core";
import { twMerge } from "tailwind-merge";

interface PropsType extends ButtonProps {
  className?: string;
  children: React.ReactNode;
}

const MyButton: React.FC<PropsType> = ({ className, children, ...props }) => {
  return (
    <Button {...props} className={twMerge("bg-blue-500 w-full", className)}>
      {children}
    </Button>
  );
};

export default MyButton;
