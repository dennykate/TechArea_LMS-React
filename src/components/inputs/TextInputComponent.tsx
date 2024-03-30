/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput, TextInputProps } from "@mantine/core";
import { ChangeEvent } from "react";
import { UseFormReturnType } from "@mantine/form";

interface PropsType extends Omit<TextInputProps, "form"> {
  value?: number | string;
  onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  form?: UseFormReturnType<any>;
  name?: string;
  inputClassName?: string;
}

const TextInputComponent: React.FC<PropsType> = ({
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
  classNames,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      disabled={disabled}
      label={label}
      withAsterisk={withAsterisk}
      className="w-full"
      placeholder={placeholder}
      classNames={{
        label: `sm:text-[16px] text-[14px] mb-1`,
        wrapper: inputClassName,
        ...classNames,
      }}
      value={value}
      defaultValue={defaultValue}
      onChange={onChangeHandler}
      {...form?.getInputProps(name as string)}
    />
  );
};

export default TextInputComponent;
