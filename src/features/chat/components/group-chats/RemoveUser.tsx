/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import useMutate from "@/hooks/useMutate";
import useQuery from "@/hooks/useQuery";
import { Avatar, Badge, Checkbox, Text } from "@mantine/core";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface PropsType {
  groupChatId: string;
  onSuccess: () => void;
}

const RemoveUser: React.FC<PropsType> = ({ groupChatId, onSuccess }) => {
  const [users, setUsers] = useState<any[]>([]);

  const { data } = useQuery(`/group-chats/get-group-chat-users/${groupChatId}`);

  const [mutate, { isLoading }] = useMutate({
    navigateBack: false,
    callback: () => {
      onSuccess();
    },
  });

  const onClickHandler = useCallback(() => {
    if (users.length === 0)
      return toast.error("Please select students or teacher");

    const data = {
      users,
    };

    return mutate(`/group-chats/${groupChatId}/remove-user`, data);
  }, [groupChatId, users]);

  const onUserSelect = (dt: any) => {
    setUsers((prev: any[]) => {
      const isExist = prev?.find((prevDt: any) => prevDt?.user_id === dt?.id);

      if (isExist) {
        return prev?.filter((prevDt: any) => prevDt?.user_id !== dt?.id);
      }

      return [...prev, { user_id: dt?.id }];
    });
  };

  return (
    <div className="w-full">
      <div className="mt-4 flex flex-col items-center gap-2 sm:max-h-[55vh] h-[70vh] overflow-y-auto">
        {data?.length > 0 ? (
          data?.map((dt: any) => (
            <button
              key={dt?.id}
              className="flex items-center gap-4 w-full hover:bg-gray-100 p-4"
              onClick={() => onUserSelect(dt)}
            >
              <Checkbox
                checked={users?.find((user) => user?.user_id === dt?.id)}
                onChange={() => {}}
              />

              <Avatar size="md" src={dt?.profile} />

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Text variant="text">{dt?.name}</Text>
                  <Badge>{dt?.role?.name}</Badge>

                  {dt?.isAdmin && <Badge color="red">Admin</Badge>}
                </div>

                <Text color="dimmed" size={"sm"}>
                  {dt?.section && dt?.section?.name},{" "}
                  {dt?.grade && dt?.grade?.name}
                </Text>
              </div>
            </button>
          ))
        ) : (
          <div className="w-full text-center">
            <Text>There is no data.</Text>
          </div>
        )}
      </div>

      <div className="mt-4 w-full">
        <MyButton
          className="w-full"
          size="lg"
          loading={isLoading}
          onClick={onClickHandler}
        >
          Remove From My Group
        </MyButton>
      </div>
    </div>
  );
};

export default RemoveUser;
