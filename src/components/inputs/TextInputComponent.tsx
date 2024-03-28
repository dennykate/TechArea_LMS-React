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
  inputClassName?: string;
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
  withAsterisk,
  inputClassName,
}: PropsType) => {
  return (
    <TextInput
      disabled={disabled}
      label={label}
      withAsterisk={withAsterisk}
      className="w-full"
      placeholder={placeholder}
      classNames={{
        label: `sm:text-[16px] text-[14px] mb-1`,
        wrapper: inputClassName,
      }}
      value={value}
      defaultValue={defaultValue}
      onChange={onChangeHandler}
      {...form?.getInputProps(name as string)}
    />
  );
};

export default TextInputComponent;
