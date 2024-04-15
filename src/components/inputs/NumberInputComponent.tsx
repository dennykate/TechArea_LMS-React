/* eslint-disable @typescript-eslint/no-explicit-any */
import { NumberInput, NumberInputProps } from "@mantine/core";

interface PropsType extends Omit<NumberInputProps, "form"> {
  form?: any;
}

const NumberInputComponent = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  form,
  name,
  withAsterisk,
  ...props
}: PropsType) => {
  return (
    <NumberInput
      {...props}
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      defaultValue={1}
      min={0}
      classNames={{
        label: `sm:text-[16px] text-[14px] mb-1`,
      }}
      value={value ? parseInt(value as unknown as string) : 0}
      onChange={onChange}
      withAsterisk={withAsterisk}
      {...form?.getInputProps(name as string)}
    />
  );
};

export default NumberInputComponent;
