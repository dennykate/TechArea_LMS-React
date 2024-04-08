/* eslint-disable @typescript-eslint/no-explicit-any */
import MyButton from "@/components/buttons/MyButton";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import useMutate from "@/hooks/useMutate";
import useQuery from "@/hooks/useQuery";
import { Avatar, Checkbox, Group, ScrollArea, Text } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";

interface PropsType {
  sectionId: string;
  oldTeacherId: string;
  close: () => void;
}

const AddTeacher: React.FC<PropsType> = ({
  sectionId,
  oldTeacherId,
  close,
}) => {
  const [name, setName] = useDebouncedState<string>("", 500);
  const [data, setData] = useState<any>();
  const [teacherId, setTeacherId] = useState<string>(oldTeacherId);

  useQuery(`/users?search=${name}&filter[role_id]=2`, setData);

  const [onSubmit, { isLoading }] = useMutate({
    navigateBack: false,
    callback: () => close(),
  });

  const onClickHandler = () => {
    if (teacherId == "") return toast.error("Plases select teacher");

    onSubmit(
      `sections/${sectionId}/set-teacher`,
      { teacher_id: teacherId },
      "POST"
    );
  };

  return (
    <div className="space-y-4">
      <TextInputComponent
        placeholder="Search with teacher's name"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />

      <ScrollArea mah={250}>
        {data?.length > 0 ? (
          data?.map((dt: any) => (
            <div
              key={dt.id}
              className="flex items-center justify-between border-t py-2 cursor-pointer
                hover:bg-gray-100 px-2"
                
              onClick={() => setTeacherId(dt.id)}
            >
              <Group noWrap className=" justify-between items-center flex">
                <Avatar src={dt?.profile} alt={dt?.name} size="md" />

                <div>
                  <Text>{dt?.name}</Text>
                  <Text size="xs" color="dimmed">
                    {dt?.phone}
                  </Text>
                </div>
              </Group>

              <Checkbox
                checked={dt.id == teacherId}
                id={dt.id}
                onChange={() => setTeacherId(dt.id)}
              />
            </div>
          ))
        ) : (
          <Text size="xs" align="center">
            There is no teachers
          </Text>
        )}
      </ScrollArea>

      <div className="w-full mt-4 flex justify-end items-center">
        <MyButton onClick={onClickHandler} loading={isLoading}>
          Confirm
        </MyButton>
      </div>
    </div>
  );
};

export default AddTeacher;
