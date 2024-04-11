/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import DoughnutChart from "./DonutChart";
import { data } from "../data";
// import useQuery from "@/hooks/useQuery";
// import Loading from "@/components/Loading";

const toggleTabs = [
  { name: "Weekly", slug: "weekly" },
  { name: "Monthly", slug: "monthly" },
  { name: "Yearly", slug: "yearly" },
];

// const backgroundColor = [
//   "#66ccff",
//   "#6699ff",
//   "#00cc99",
//   "#8080ff",
//   "#ffdb4d",
//   "#ff6666",
// ];

interface DonutChartContainerProps {
  title: string;
}

const DonutChartContainer = ({ title }: DonutChartContainerProps) => {
  const [activeSlug, setActiveSlug] = useState<string>("weekly");
  //   const [bestSellers, setBestSellers] = useState<any[]>([]);

  //   const { isLoading } = useQuery(
  //     `/dashboard/bestsellers?type=${activeSlug}`,
  //     setBestSellers
  //   );

  //   const parseData = (array: any[] | undefined, key: string) => {
  //     return array?.map((dt) => ({ [key]: dt[key] }));
  //   };

  //   const data = useMemo(
  //     () => ({
  //       labels: parseData(bestSellers, "name")?.map((dt) => dt.name),
  //       datasets: [
  //         {
  //           label: "Order",
  //           data: parseData(bestSellers, "quantity")?.map((dt) => dt.quantity),
  //           backgroundColor: backgroundColor.slice(0, bestSellers.length),
  //           // hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
  //         },
  //       ],
  //     }),
  //     [bestSellers]
  //   );

  //   const products = useMemo(
  //     () =>
  //       parseData(bestSellers, "name")?.map((data, index) => (
  //         <div key={index} className="flex gap-[6px] items-center">
  //           <div
  //             className={`w-[10px] h-[10px] rounded-full bg-transparent border-[1px] `}
  //             style={{ borderColor: backgroundColor[index] }}
  //           ></div>
  //           <h1 className="text-sm text-gray-600 whitespace-pre-wrap">
  //             {data.name}
  //           </h1>
  //         </div>
  //       )),
  //     [bestSellers]
  //   );

 

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
      {/* {isLoading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loading />
        </div>
      ) : products && products?.length > 0 ? ( */}
      <div className="flex sm:gap-5 gap-3 sm:py-10 py-5 items-center px-2">
        <div className="h-full sm:max-w-[70%] max-w-[60%]">
          {activeSlug === "weekly" && <DoughnutChart data={data as any} />}
          {activeSlug === "monthly" && <DoughnutChart data={data as any} />}
          {activeSlug === "yearly" && <DoughnutChart data={data as any} />}
        </div>
        {/* <div className="">
          <div className="flex flex-col gap-3">{products}</div>
        </div> */}
      </div>
      {/* ) : (
        <div className="w-full h-[300px] flex justify-center items-center">
          <p className="text-sm">ပြသရန်မရှိပါ</p>
        </div>
      )} */}
    </div>
  );
};

export default DonutChartContainer;
