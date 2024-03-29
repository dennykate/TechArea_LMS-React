/* eslint-disable @typescript-eslint/no-explicit-any */
import { MultiSelect, Select } from "@mantine/core";
import { InputProps } from "./types/type";
import { UseFormReturnType } from "@mantine/form";
import { twMerge } from "tailwind-merge";

interface PropsType extends InputProps {
  data: { value: string; label: string }[];
  multiple?: boolean;
  onChangeHandler?: ((e: any) => void) | undefined;
  valueForMultiple?: string[];
  value?: string;
  form?: UseFormReturnType<any>;
  name?: string;
  defaultValue?: string | undefined;
  defaultValueForMultiple?: string[] | undefined;
  searchInputClassName?: string;
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
}: PropsType) => {
  return (
    <>
      {multiple ? (
        <MultiSelect
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
        />
      ) : (
        <Select
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
        />
      )}
    </>
  );
};

export default SelectComponent;
