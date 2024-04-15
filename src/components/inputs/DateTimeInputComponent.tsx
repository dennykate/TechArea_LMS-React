/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTimePicker, DateTimePickerProps } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IoCalendarSharp } from "react-icons/io5";

interface PropsType extends Omit<DateTimePickerProps, "form"> {
  form?: UseFormReturnType<any>;
  name?: string;
  format?: string;
  placeholder?: string;
}
export default function DateTimeInputComponent({
  label,
  form,
  name,
  format,
  withAsterisk,
  placeholder,
  ...props
}: PropsType) {
  return (
    <DateTimePicker
      {...props}
      placeholder={placeholder}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      valueFormat={format ?? "DD MMM YYYY hh:mm A"}
      label={label}
      classNames={{
        label: `sm:text-[16px] text-[14px] mb-1`,
        input: "h-[35px]",
        placeholder: "text-base",
        weekday: "!text-black",
      }}
      name={name}
      {...form?.getInputProps(name as string)}
      withAsterisk={withAsterisk}
      rightSection={<IoCalendarSharp size={20} className="mr-2 opacity-60" />}
    />
  );
}
