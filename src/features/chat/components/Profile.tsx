import { Avatar, Flex, Text } from "@mantine/core";
interface LayoutProps {
  gap: string;
}
const Profile: React.FC<LayoutProps> = ({ gap }) => {
  return (
    <div
      className={`bg-blue-300 border cursor-pointer ${gap}  rounded shadow-sm flex items-center p-5 bg-white my-0.5 w-full`}
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
        <Text fz={16} fw={600}>
          Jhon Doe
        </Text>
      </Flex>
    </div>
  );
};

export default Profile;
