/* eslint-disable @typescript-eslint/no-explicit-any */
import { Textarea } from "@mantine/core";
import { InputProps } from "./types/type";

const TextAreaComponent = ({
  label,
  placeholder,
  name,
  form,
  minRows,
  withAsterisk,
}: InputProps) => {
  return (
    <Textarea
      label={label}
      placeholder={placeholder}
      minRows={minRows?? 2}
      classNames={{ label: `sm:text-[16px] text-[14px] mb-2` }}
      {...form?.getInputProps(name as string)}
      withAsterisk={withAsterisk}
    />
  );
};

export default TextAreaComponent;
