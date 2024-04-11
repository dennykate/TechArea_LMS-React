/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { useEffect, useMemo, useState, useCallback } from "react";

import useLogout from "./useLogout";
import { useGetDataQuery } from "@/redux/api/queryApi";
import parseUrl from "@/utilities/parseUrl";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";

type ReturnType = {
  isLoading?: boolean;
  isError?: boolean;
  total?: number;
  data?: any[] | any;
};

const useQuery = (
  url: string,
  callback?: (value: any) => void,
  kill: boolean = false
): ReturnType => {
  if (kill) return { isLoading: false };
  const logout = useLogout();
  const { pathname } = useLocation();
  const code = useAppSelector((state) => state.key.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const queryUrl = useMemo(() => parseUrl(url), [pathname, url, code]);

  const { data, error } = useGetDataQuery(url) as any;

  const initLoading = useCallback(() => setIsLoading(true), [queryUrl]);

  useEffect(() => initLoading(), [initLoading]);

  useEffect(() => {
    if (data && callback) {
      callback(data?.data);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsLoading(false);
      if (error.status === 401) {
        toast.error("You're Unauthorized");

        logout();
      }

      toast.error("Something wrong");
    }
  }, [error]);

  return {
    isLoading,
    isError: error?.status > 400,
    total: data?.meta?.last_page || 0,
    data: data?.data || [],
  };
};

export default useQuery;
