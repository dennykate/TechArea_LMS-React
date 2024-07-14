/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateInput, DateInputProps } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IoCalendarSharp } from "react-icons/io5";

interface PropsType extends Omit<DateInputProps, "form"> {
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
  ...props
}: PropsType) {
  return (
    <DateInput
      {...props}
      valueFormat={format ? format : "YYYY/MM/DD"}
      label={label}
      placeholder={`${placeholder} ( Format - 2023/01/09 )`}
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
