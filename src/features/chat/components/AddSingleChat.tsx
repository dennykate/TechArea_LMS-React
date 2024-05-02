import { useState, ChangeEvent } from "react";
import UserProfile from "./UserProfile";
import { useGetDataQuery } from "@/redux/api/queryApi";
import { Pagination, Text } from "@mantine/core";
import SelectComponent from "@/components/inputs/SelectComponent";
import TextInputComponent from "@/components/inputs/TextInputComponent";

interface SearchProps {
  role: number;
  name: string;
}

interface Data {
  id: string;
  name: string;
  profile: string;
  email: string;
  description: string;
  image: string;
  last_message: string;
  role: string;
}

interface ModelProps {
  close: () => void;
}
const ITEMS_PER_PAGE = 16;

const AddSingleChat: React.FC<ModelProps> = ({ close }) => {
  // all users
  const [search, setSearch] = useState<SearchProps>({ role: 1, name: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetDataQuery(
    `/users?filter[role_id]=${search.role}&search=${search.name}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch({ role: 1, name: event.target.value });
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleRoleChange = (value: string) => {
    setSearch({ ...search, role: Number(value) });
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Could not fetch data.</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-row sm:gap-5 gap-2 justify-between items-center mb-4 w-full">
        <SelectComponent
          placeholder="Select role"
          value={search.role.toString()}
          onChangeHandler={handleRoleChange}
          data={[
            { value: "1", label: "Student" },
            { value: "2", label: "Teacher" },
            { value: "3", label: "Admin" },
            { value: "4", label: "Staff" },
          ]}
          searchInputClassName="w-[100px] md:w-[200px]"
        />
        <TextInputComponent
          type="text"
          value={search.name}
          onChange={handleSearchChange}
          placeholder="Search by name"
          classNames={{
            root: "!w-[300px]",
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {data?.data?.length > 0 ? (
          data?.data?.map((el: Data) => (
            <UserProfile
              close={close}
              parent="single_chat"
              data={el}
              key={el.id}
            />
          ))
        ) : (
          <div className="h-[100px] col-span-2 flex justify-center items-center">
            <Text size="sm" color="dimmed">
              There is no students
            </Text>
          </div>
        )}
      </div>
      <div className="mt-10 mb-5 flex w-full justify-end">
        <Pagination onChange={handlePageChange} total={data?.meta?.last_page} />
      </div>
    </div>
  );
};

export default AddSingleChat;
