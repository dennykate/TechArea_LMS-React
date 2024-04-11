/* eslint-disable @typescript-eslint/no-explicit-any */
import { NumberInput } from "@mantine/core";
import { InputProps } from "./types/type";

interface PropsType extends InputProps {
  value?: number | string;
  onChangeHandler?: (e: number) => void;
  disabled?: boolean;
}

const NumberInputComponent = ({
  label,
  placeholder,
  value,
  onChangeHandler,
  disabled,
  form,
  name,
  withAsterisk,
}: PropsType) => {
  return (
    <NumberInput
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      defaultValue={1}
      min={0}
      classNames={{
        label: `sm:text-[16px] text-[14px] mb-1`,
      }}
      value={value ? parseInt(value as unknown as string) : 0}
      onChange={onChangeHandler}
      withAsterisk={withAsterisk}
      {...form?.getInputProps(name as string)}
    />
  );
};

export default NumberInputComponent;
