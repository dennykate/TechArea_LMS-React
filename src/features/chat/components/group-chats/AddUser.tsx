/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import SelectComponent from "@/components/inputs/SelectComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import useMutate from "@/hooks/useMutate";
import useQuery from "@/hooks/useQuery";
import { Avatar, Badge, Checkbox, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface PropsType {
  groupChatId: string;
  onSuccess: () => void;
}

const AddUser: React.FC<PropsType> = ({ groupChatId, onSuccess }) => {
  const [searchParams, setSearchParams] = useState({ role: "1", name: "" });
  const [users, setUsers] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [debouncedName] = useDebouncedValue(searchParams.name, 300);

  useQuery(
    `/users?filter[role_id]=${searchParams.role}&limit=1000${
      debouncedName !== "" ? `&search=${debouncedName}` : ""
    }`,
    setData
  );

  const { data: groupChatUsers } = useQuery(
    `/group-chats/get-group-chat-users/${groupChatId}`
  );

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

    return mutate(`/group-chats/${groupChatId}/add-user`, data);
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

  useEffect(() => {
    setFilteredData(() => {
      return data
        ?.map((prevDt: any) => {
          const isExistInGroup = groupChatUsers?.find(
            (user: any) => user.id === prevDt?.id
          );

          if (!isExistInGroup) return prevDt;
        })
        .filter((prevDt: any) => prevDt !== undefined);
    });
  }, [data, groupChatUsers]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 w-full">
        <SelectComponent
          placeholder="Select role"
          data={[
            { value: "1", label: "Student" },
            { value: "2", label: "Teacher" },
          ]}
          searchInputClassName="w-[100px] sm:w-[150px]"
          value={searchParams.role}
          onChangeHandler={(e) => {
            setSearchParams((prev) => ({ ...prev, role: e }));
          }}
        />
        <TextInputComponent
          placeholder="Enter name"
          value={searchParams.name}
          onChange={(e) => {
            setSearchParams((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 sm:max-h-[55vh] h-[70vh] overflow-y-auto">
        {filteredData?.length > 0 ? (
          filteredData?.map((dt: any) => (
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
                  <Badge>{dt?.role}</Badge>
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
          Add To My Group
        </MyButton>
      </div>
    </div>
  );
};

export default AddUser;
