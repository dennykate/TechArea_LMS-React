/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";

// import useQuery from "@/hooks/useQuery";
import DashCard from "./DashCard";
import { FaChalkboardTeacher } from "react-icons/fa";
// import Loading from "@/components/Loading";

const DashCardContainer = () => {
  const data = [
    {
      count: 10,
      label: "Quantity",
      Icon: <FaChalkboardTeacher />,
      link: "",
    },
    {
      count: 10,
      label: "Quantity",
      Icon: <FaChalkboardTeacher />,
      link: "",
    },
    {
      count: 10,
      label: "Quantity",
      Icon: <FaChalkboardTeacher />,
      link: "",
    },
    {
      count: 10,
      label: "Quantity",
      Icon: <FaChalkboardTeacher />,
      link: "",
    },
  ];

  //   const [data, setData] = useState<any[]>([]);

  //   const { isLoading } = useQuery("dashboard/stats", setData);

  return (
    <>
      {/* {isLoading &&
        [0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full min-h-[90px] flex justify-center items-center bg-white p-5 rounded-[5px] shadow-md border border-gray-200"
          >
            <Loading />
          </div>
        ))} */}

      {data?.map((dt, index) => (
        <DashCard
          quantity={dt.count}
          label={dt.label}
          Icon={dt.Icon}
          key={index}
          link={dt.link}
        />
      ))}
    </>
  );
};

export default DashCardContainer;
