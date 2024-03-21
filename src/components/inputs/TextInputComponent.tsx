/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput } from "@mantine/core";
import { InputProps } from "./types/type";
import { ChangeEvent } from "react";
import { UseFormReturnType } from "@mantine/form";

interface PropsType extends InputProps {
  value?: number | string;
  onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  form?: UseFormReturnType<any>;
  name?: string;
}

const TextInputComponent = ({
  label,
  placeholder,
  value,
  onChangeHandler,
  disabled,
  form,
  name,
  defaultValue,
}: PropsType) => {
  return (
    <TextInput
      disabled={disabled}
      label={label}
      className="w-full"
      placeholder={placeholder}
      classNames={{
        label: `sm:text-[14px] text-[12px] mb-2`,
      }}
      value={value}
      defaultValue={defaultValue}
      onChange={onChangeHandler}
      {...form?.getInputProps(name as string)}
    />
  );
};

export default TextInputComponent;
