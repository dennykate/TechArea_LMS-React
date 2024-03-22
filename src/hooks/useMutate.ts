/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";

import { usePostDataMutation } from "@/redux/api/queryApi";
import useLogout from "./useLogout";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";
import { regenrate } from "@/redux/services/keySlice";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

type ReturnType = [
  (
    url: string,
    values?: any | undefined,
    method?: MethodType,
    isFormData?: boolean
  ) => Promise<string | void>,
  { isLoading: boolean }
];

type ParamsType = {
  callback?: (value: any, navigate: NavigateFunction) => void;
  navigateBack?: boolean;
  disableAlert?: boolean;
};

const useMutate = (params: ParamsType = {}): ReturnType => {
  const { callback, navigateBack = true, disableAlert = false } = params;

  const logout = useLogout();
  const navigate = useNavigate();
  const [mutate, { isLoading }] = usePostDataMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (
    url: string,
    values: any | undefined = undefined,
    method: MethodType = "POST"
  ) => {
    const { data, error } = (await mutate({
      url,
      method,
      body: values ?? {},
    })) as any;

    if (error) {
      if (error?.status === 401) {
        toast.error("အကောင့်အသုံးပြုခွင့်မရှိပါ");

        return logout();
      }

      return toast.error(error?.data?.message || "လုပ်ဆောင်မှုမအောင်မြင်ပါ");
    }

    if (data?.message) {
      if (!disableAlert) toast.success(data?.message);

      if (method === "DELETE") {
        dispatch(regenrate());
      }
    }

    if (data && callback) {
      return callback(data, navigate);
    }

    if (navigateBack && method !== "DELETE") {
      return navigate(-1);
    }
  };

  return [onSubmit, { isLoading }];
};

export default useMutate;
