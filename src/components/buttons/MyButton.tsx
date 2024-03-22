import { Button } from "@mantine/core";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface PropsType extends HTMLAttributes<HTMLButtonElement> {
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
