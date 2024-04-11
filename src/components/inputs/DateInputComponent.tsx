/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateInput } from "@mantine/dates";
import { InputProps } from "./types/type";
import { UseFormReturnType } from "@mantine/form";
import { IoCalendarSharp } from "react-icons/io5";

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
  withAsterisk,
}: PropsType) {
  return (
    <DateInput
      valueFormat={format ? format : "YYYY/MM/DD"}
      label={label}
      placeholder={placeholder}
      classNames={{
        label: `sm:text-[16px] text-[14px] mb-1`,
        weekday: "!text-black",
      }}
      {...form?.getInputProps(name as string)}
      withAsterisk={withAsterisk}
      rightSection={<IoCalendarSharp size={20} className="mr-2 opacity-60" />}
    />
  );
}
