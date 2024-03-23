import { Breadcrumbs } from "@mantine/core";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface PropsType {
  items: { title: string; link: string }[];
}

const MyBreadcrumbs: React.FC<PropsType> = ({ items }) => {
  const crumbs = useMemo(
    () =>
      items.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className={twMerge(
            item.link === "" ? "text-gray-500 cursor-default" : "text-black"
          )}
        >
          {item.title}
        </Link>
      )),
    [items]
  );

  return <Breadcrumbs separator="/">{crumbs}</Breadcrumbs>;
};

export default MyBreadcrumbs;
