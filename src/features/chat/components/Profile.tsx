import useEncryptStorage from "@/hooks/use-encrypt-storage";
import { Avatar, Flex, Text } from "@mantine/core";
interface LayoutProps {
  gap: string;
}
const Profile: React.FC<LayoutProps> = ({ gap }) => {
  const { get } = useEncryptStorage();
  const userData: {
    profile: null;
    gender: string | null;
    name: string;
  } = JSON.parse(get("userInfo") as string);

  console.log(userData);
  return (
    <div
      className={`bg-blue-200 h-full border cursor-pointer ${gap} shadow-sm flex items-center px-2 md:p-5 bg-white w-full`}
    >
      <Avatar
        radius={"100%"}
        size={"md"}
        src={
          userData?.profile !== null
            ? userData?.profile
            : userData?.gender === "male" || userData?.gender === null
            ? "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            : "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png"
        }
      />
      <Flex
        gap="sm"
        justify="flex-start"
        align="flex-start"
        direction={"column"}
      >
        <Text fz={16} fw={600}>
          {userData?.name}
        </Text>
      </Flex>
    </div>
  );
};

export default Profile;
