import { useState, ChangeEvent } from "react";
import UserProfile from "./UserProfile";
import { useGetDataQuery } from "@/redux/api/queryApi";

interface SearchProps {
  role: number;
  name: string;
}

interface Data {
  id: string;
  name: string;
  profile: string;
  email: string;
}

const AddChatMate = () => {
  const [search, setSearch] = useState<SearchProps>({ role: 1, name: "" });
  const { data, isLoading, error } = useGetDataQuery({
    url: `/users?filter[role_id]=${search.role}&search=${search.name}`,
  });
  // console.log(error)

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearch((prev) => ({ ...prev, role: parseInt(event.target.value, 10) }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch((prev) => ({ ...prev, name: event.target.value }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Could not fetch data.</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={search.name}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="p-2 border rounded"
        />
        <select value={search.role} onChange={handleRoleChange} className="p-2 border rounded">
          <option value="1">Role 1</option>
          <option value="2">Role 2</option>
          <option value="3">Role 3</option>
          {/* Add more roles as needed */}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {data?.data?.map((el: Data) => (
          <UserProfile data={el} key={el.id} />
        ))}
      </div>
    </div>
  );
};

export default AddChatMate;
