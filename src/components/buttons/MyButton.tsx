import { Button, ButtonProps } from "@mantine/core";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface PropsType
  extends Omit<ButtonProps, "color">,
    Omit<HTMLAttributes<HTMLButtonElement>, "color"> {
  className?: string;
  children: React.ReactNode;
  color?: ButtonProps["color"] | HTMLAttributes<HTMLButtonElement>["color"];
}

const MyButton: React.FC<PropsType> = ({
  className,
  children,
  variant,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant={variant}
      className={twMerge("w-auto", className, !variant && "bg-[#1C7ED6]")}
    >
      {children}
    </Button>
  );
};

export default MyButton;
