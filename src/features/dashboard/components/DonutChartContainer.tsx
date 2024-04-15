/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";

import DoughnutChart from "./DonutChart";
import useQuery from "@/hooks/useQuery";
import { Loader } from "@mantine/core";

const toggleTabs = [
  { name: "Weekly", slug: "weekly" },
  { name: "Monthly", slug: "monthly" },
  { name: "Yearly", slug: "yearly" },
];

interface DonutChartContainerProps {
  title: string;
  baseURL: string;
}

const DonutChartContainer = ({ title, baseURL }: DonutChartContainerProps) => {
  const [activeSlug, setActiveSlug] = useState<string>("weekly");
  const [res, setRes] = useState<any>();

  const { isLoading } = useQuery(`${baseURL}?type=${activeSlug}`, setRes);

  const chartData = useMemo(() => {
    return {
      labels: res?.map((dt: any) => dt?.name),
      datasets: [
        {
          label: title,
          data: res?.map((dt: any) => dt?.percentage),
          backgroundColor: res?.map((dt: any) => dt?.color),
        },
      ],
    };
  }, [res]);

  const items = useMemo(() => {
    return res?.map((dt: any) => (
      <div className="flex items-center gap-1">
        <div
          className={`min-w-[10px] h-[10px] rounded-full border-[1px] `}
          style={{ background: dt?.color }}
        ></div>
        <h1 className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-1">
          {dt.name}
        </h1>
      </div>
    ));
  }, [res]);

  return (
    <div className="w-full flex flex-col h-auto ">
      <div className="border-b pb-3">
        <p className="font-semibold sm:text-[20px] text-base text-gray-500">
          {title}
        </p>
      </div>
      <div className="tabs flex gap-6 px-5 border-b ">
        {toggleTabs.map(({ name, slug }, index) => (
          <button
            key={index}
            className={`flex gap-2 justify-center items-center sm:text-[16px] text-xs font-medium text-gray-400 p-2 translate-y-[1px]
           ${
             activeSlug == slug && " border-b-2 border-blue-400 text-gray-500 "
           }`}
            onClick={() => setActiveSlug(slug)}
          >
            {name}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader />
        </div>
      ) : items && items?.length > 0 ? (
        <div className="flex sm:gap-5 gap-3 sm:py-10 py-5 items-center px-2">
          <div className="h-full sm:max-w-[70%] max-w-[60%]">
            {activeSlug === "weekly" && (
              <DoughnutChart data={chartData as any} />
            )}
            {activeSlug === "monthly" && (
              <DoughnutChart data={chartData as any} />
            )}
            {activeSlug === "yearly" && (
              <DoughnutChart data={chartData as any} />
            )}
          </div>
          <div className="">
            <div className="flex flex-col gap-3">{items}</div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[300px] flex justify-center items-center">
          <p className="text-sm">No Records</p>
        </div>
      )}
    </div>
  );
};

export default DonutChartContainer;
