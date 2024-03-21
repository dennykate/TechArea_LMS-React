/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateInput } from "@mantine/dates";
import { InputProps } from "./types/type";
import { UseFormReturnType } from "@mantine/form";
// import { ChangeEvent } from "react";

interface PropsType extends InputProps {
  // value?: number | string;
  // onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  // disabled?: boolean;
  form?: UseFormReturnType<any>;
  name?: string;
  format?: string;
}

export default function DateInputComponent({
  label,
  placeholder,
  form,
  name,
  format,
}: PropsType) {
  return (
    <DateInput
      valueFormat={format ? format : "YYYY/MM/DD"}
      label={label}
      placeholder={placeholder}
      classNames={{
        label: `sm:text-[16px] text-[14px] mb-2`,
      }}
      {...form?.getInputProps(name as string)}
    />
  );
}
