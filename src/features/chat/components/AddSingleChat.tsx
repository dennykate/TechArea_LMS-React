import { useState, ChangeEvent } from "react";
import UserProfile from "./UserProfile";
import { useGetDataQuery } from "@/redux/api/queryApi";
import { Pagination, Select } from "@mantine/core";

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
}

interface ModelProps {
  close: () => void;
}
const ITEMS_PER_PAGE = 16;

const AddSingleChat: React.FC<ModelProps> = ({ close }) => {
  // all users
  const [search, setSearch] = useState<SearchProps>({ role: 0, name: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetDataQuery(
    `/users?filter[role_id]=${search.role}&search=${search.name}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  console.log(data);

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
      <div className="flex md:flex-row flex-col gap-5 justify-between items-center mb-4">
        <Select
          size="lg"
          placeholder="Select role"
          value={search.role.toString()}
          onChange={handleRoleChange}
          data={[
            { value: "1", label: "Student" },
            { value: "2", label: "Teacher" },
          ]}
          className="w-full md:w-[300px]"
        />
        <input
          type="text"
          value={search.name}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="h-[50px] w-full md:w-[300px] p-2 border border-gray-500 rounded placeholder:text-gray-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {data?.data?.map((el: Data) => (
          <UserProfile close={close} parent="single_chat" data={el} key={el.id} />
        ))}
      </div>
      <Pagination onChange={handlePageChange} total={data?.meta?.total} />
    </div>
  );
};

export default AddSingleChat;
