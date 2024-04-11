/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { Group, Box, Collapse, UnstyledButton, rem } from "@mantine/core";
import { FaChevronRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import SideBarLinkItem from "./SideBarLinkItem";
import { LinkType } from "./type";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: string | undefined;
  links?: LinkType[];
}

export default function SideBarLinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}: LinksGroupProps) {
  const navigate = useNavigate();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const { pathname } = useLocation();

  const items = (hasLinks ? links : []).map((link) => (
    <SideBarLinkItem key={link.label} link={link} />
  ));

  const onClickHandler = () => {
    return link ? navigate(link) : setOpened((prev) => !prev);
  };

  const isActiveTab = useMemo(() => {
    if (!hasLinks) return pathname.includes(link as string);

    const isExisted = !!links.find((link) =>
      pathname.includes(link.path as string)
    );

    if (isExisted) {
      setOpened(true);
      return true;
    } else {
      return false;
    }
  }, [pathname]);

  return (
    <Box>
      <UnstyledButton
        onClick={onClickHandler}
        className={`w-full block px-4 rounded-md ${
          isActiveTab
            ? "text-primary-500 bg-primary-500 bg-opacity-10"
            : "hover:bg-gray-100"
        }`}
      >
        <Group className="justify-between gap-0">
          <Box
            style={{ display: "flex", alignItems: "center" }}
            className="py-3 "
          >
            <Icon style={{ width: rem(20), height: rem(20) }} />
            <Box ml="md" className="lg:text-base text-sm">
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <FaChevronRight
              className=" transition-all duration-300 ease-in-out group-hover:text-primary-500 lg:text-sm text-xs"
              style={{
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </Box>
  );
}
