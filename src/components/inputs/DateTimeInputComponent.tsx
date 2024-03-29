/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTimePicker } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IoCalendarSharp } from "react-icons/io5";
import { InputProps } from "./types/type";

interface PropsType extends InputProps {
  // value?: number | string;
  // onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  // disabled?: boolean;
  form?: UseFormReturnType<any>;
  name?: string;
  format?: string;
}
export default function DateTimeInputComponent({
  label,
  placeholder,
  form,
  name,
  format,
  withAsterisk,
}: PropsType) {
  return (
    <DateTimePicker
      valueFormat={format ?? "DD MMM YYYY hh:mm A"}
      label={label}
      placeholder={placeholder}
      classNames={{
        label: `sm:text-[16px] text-[14px] mb-1`,
        input: "h-[35px]",
        placeholder:"text-base"
      }}
      {...form?.getInputProps(name as string)}
      withAsterisk={withAsterisk}
      rightSection={<IoCalendarSharp size={20} className="mr-2 opacity-60" />}
    />
  );
}
