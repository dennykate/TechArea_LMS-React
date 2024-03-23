import { PasswordInput } from "@mantine/core";
import React from "react";
import { InputProps } from "./types/type";

const PasswordInputComponent = ({
  label,
  placeholder,
  withAsterisk,
}: InputProps) => {
  return (
    <PasswordInput
      label={label}
      placeholder={placeholder}
      classNames={{ label: "sm:text-[16px] text-[14px] mb-1" }}
      withAsterisk={withAsterisk}
    />
  );
};

export default PasswordInputComponent;
