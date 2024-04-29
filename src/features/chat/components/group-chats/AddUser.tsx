import SelectComponent from "@/components/inputs/SelectComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";
import { Avatar, Badge, Checkbox, Text } from "@mantine/core";

const AddUser = () => {
    
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
        />
        <TextInputComponent placeholder="Enter name" />
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <button className="flex items-center gap-4 w-full hover:bg-gray-100 px-2 py-4">
          <Checkbox />

          <div className="flex items-center gap-2">
            <Avatar size="md" />
            <Text variant="text">Mg Mg</Text>
            <Badge>Student</Badge>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddUser;
