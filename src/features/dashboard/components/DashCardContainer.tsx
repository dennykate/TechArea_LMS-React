/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";

// import useQuery from "@/hooks/useQuery";
import useQuery from "@/hooks/useQuery";
import DashCard from "./DashCard";
import { useMemo, useState } from "react";
import { Skeleton } from "@mantine/core";
import { RiAdminLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import { PiChalkboardTeacherLight, PiStudent } from "react-icons/pi";
import withPermissions from "@/hocs/withPermissions";
import { banRoles } from "@/data/banRoles";
// import Loading from "@/components/Loading";

const DashCardContainer = () => {
  const [cardData, setCardData] = useState<any>();

  const { isLoading } = useQuery("dashboard/cards", setCardData);

  const data = useMemo(
    () =>
      cardData && [
        {
          count: cardData?.student_count,
          label: "Student",
          Icon: <PiStudent />,
          link: "",
        },
        {
          count: cardData?.teacher_count,
          label: "Teacher",
          Icon: <PiChalkboardTeacherLight />,
          link: "",
        },
        {
          count: cardData?.admin_count,
          label: "Admin",
          Icon: <RiAdminLine />,
          link: "",
        },
        {
          count: cardData?.staff_count,
          label: "Staff",
          Icon: <IoPeopleOutline />,
          link: "",
        },
      ],
    [cardData]
  );

  return (
    <>
      {isLoading &&
        [0, 1, 2, 3].map((i) => (
          <div key={i} className="w-full min-h-[90px] ">
            <Skeleton w={"100%"} h={"100%"} radius="sm" />
          </div>
        ))}

      {!isLoading &&
        data?.map((dt: any, index: number) => (
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

export default withPermissions(
  DashCardContainer,
  banRoles.components.dashCards,
  true
);
