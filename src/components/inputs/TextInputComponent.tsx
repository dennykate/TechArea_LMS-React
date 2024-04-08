/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput, TextInputProps } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface PropsType extends Omit<TextInputProps, "form"> {
  disabled?: boolean;
  form?: UseFormReturnType<any>;
  name?: string;
  inputClassName?: string;
}

const TextInputComponent: React.FC<PropsType> = ({
  label,
  placeholder,
  disabled,
  form,
  name,
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
      {...form?.getInputProps(name as string)}
    />
  );
};

export default TextInputComponent;
