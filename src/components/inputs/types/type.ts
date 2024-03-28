/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturnType } from "@mantine/form";

export interface InputProps {
  label?: string;
  placeholder?: string;
  name?: string;
  form?: UseFormReturnType<any>;
  defaultValue?: string;
  withAsterisk?: boolean;
}
