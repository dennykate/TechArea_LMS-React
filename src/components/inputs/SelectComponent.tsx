/* eslint-disable @typescript-eslint/no-explicit-any */
import { MultiSelect, Select, SelectProps } from "@mantine/core";
import { twMerge } from "tailwind-merge";

interface PropsType extends Omit<SelectProps, "label"> {
  data: { value: string; label: string }[];
  multiple?: boolean;
  onChangeHandler?: ((e: any) => void) | undefined;
  valueForMultiple?: string[];
  value?: string;
  defaultValue?: string | undefined;
  defaultValueForMultiple?: string[] | undefined;
  searchInputClassName?: string;
  disabled?: boolean;
  label?: string;
  form?: any;
  name?: any;
}

const SelectComponent = ({
  label,
  placeholder,
  data,
  multiple,
  onChangeHandler,
  valueForMultiple,
  value,
  form,
  name,
  defaultValue,
  defaultValueForMultiple,
  withAsterisk,
  searchInputClassName,
  disabled,
  ...props
}: PropsType) => {
  return (
    <>
      {multiple ? (
        <MultiSelect
          disabled={disabled}
          defaultValue={defaultValueForMultiple}
          label={label}
          placeholder={placeholder}
          classNames={{
            label: `sm:text-[16px] text-[14px] mb-1`,
            searchInput: twMerge(
              "!border-none !outline-none ",
              searchInputClassName
            ),
            root: "w-full",
          }}
          data={data}
          searchable
          value={valueForMultiple}
          onChange={onChangeHandler}
          {...form?.getInputProps(name as string)}
          withAsterisk={withAsterisk}
          {...props}
        />
      ) : (
        <Select
          disabled={disabled}
          defaultValue={defaultValue}
          label={label}
          placeholder={placeholder}
          classNames={{
            label: `sm:text-[16px] text-[14px] mb-1`,
            input: searchInputClassName,
          }}
          data={data}
          searchable
          value={value}
          onChange={(e) => onChangeHandler && onChangeHandler(e as string)}
          {...form?.getInputProps(name as string)}
          withAsterisk={withAsterisk}
          {...props}
        />
      )}
    </>
  );
};

export default SelectComponent;
