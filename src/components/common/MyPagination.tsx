import { Pagination, PaginationProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface PropsType extends PaginationProps {}

const MyPagination: React.FC<PropsType> = ({ total, ...props }) => {
  const matches = useMediaQuery("(min-width: 768px)");

  return (
    <Pagination
      {...props}
      total={total || 10}
      siblings={1}
      size={matches ? "md" : "sm"}
    />
  );
};

export default MyPagination;
