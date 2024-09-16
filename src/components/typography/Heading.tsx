import React from "react";

import { twMerge } from "tailwind-merge";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeadingProps {
  className?: string;
  children?: React.ReactNode;
  tag: HeadingTag;
  variant?: HeadingTag;
  serif?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  className,
  tag,
  variant,
  children,
  serif = false,
}) => {
  return React.createElement(
    tag,
    {
      className: twMerge(
        serif && "font-notoSerif font-normal",
        conditionalClassNames(tag, variant),
        className
      ),
    },
    children
  );
};

export default Heading;

const conditionalClassNames = (
  tag: HeadingTag,
  variant: HeadingTag | undefined
) => {
  if (tag === "h1" || variant === "h1") {
    return "sm:text-2xl text-xl font-[500]";
  }

  if (tag === "h2" || variant === "h2") {
    return "sm:text-xl text-lg font-[400]";
  }

  if (tag === "h3" || variant === "h3") {
    return "text-lg font-[400]";
  }

  if (tag === "h6" || variant === "h6") {
    return "text-base";
  }

  return "";
};
