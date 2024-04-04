import { Avatar, Badge, Flex, Text } from "@mantine/core";
interface LayoutProps {
  justify: string;
  gap: string;
}
const ChatMate: React.FC<LayoutProps> = ({ justify, gap }) => {
  return (
    <div
      className={`border hover:bg-slate-200 transition duration-75 cursor-pointer ${gap}  rounded shadow-sm flex ${justify} items-center p-5 bg-white my-0.5 w-full`}
    >
      <Avatar
        radius={"100%"}
        size={"lg"}
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
      />
      <Flex
        gap="sm"
        justify="flex-start"
        align="flex-start"
        direction={"column"}
      >
        <Flex gap="md" justify="center" align="center">
          <Text fz={16} fw={600}>
            Jhon Doe
          </Text>
          <Badge size="xs" color="blue">
            Badge
          </Badge>
        </Flex>

        <Text c="dimmed" fz={14}>
          Blah Blha
        </Text>
      </Flex>
    </div>
  );
};

export default ChatMate;
