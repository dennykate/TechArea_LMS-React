import { useState, ChangeEvent, Key } from "react";
import UserProfile from "./UserProfile";
import { useGetDataQuery } from "@/redux/api/queryApi";
import { Button, Pagination, Select, Switch } from "@mantine/core";
import GroupChatMate from "./GroupChatMate";
import { useDispatch, useSelector } from "react-redux";
import { clearGroupUsers, selectUsers } from "@/redux/services/chatSlice";
import { usePostDataMutation } from "@/redux/api/formApi";
import toast from "react-hot-toast";
import CreateGroup from "./CreateGroup";

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
interface SelectGroupState {
  show: boolean;
  groupId: string | null;
}
const ITEMS_PER_PAGE = 16;

const AddChatMate: React.FC<ModelProps> = ({ close }) => {
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

  // adding to group chat
  const [selectGroup, setSelectGroup] = useState<SelectGroupState>({
    show: true,
    groupId: null,
  });
  console.log(selectGroup);

  const {
    data: groupChatData,
    // error: groupChatError,
    // isLoading,
  } = useGetDataQuery("/group-chats");

  //in group's users
  const { data: groupUser } = useGetDataQuery(
    `/group-chats/get-group-chat-users/${selectGroup.groupId}`
  );

  // console.log(groupUser);

  // option for add and remove user
  const [addUser, setAddUser] = useState<boolean>(false);
  // console.log(addUser);

  // for adding user to gp
  const dispatch = useDispatch();
  const [addGroup] = usePostDataMutation();
  const usersId = useSelector(selectUsers);
  console.log(usersId);

  const addGroupHandler = async () => {
    try {
      const payload = {
        group_chat_id: selectGroup?.groupId,
        users: usersId.map((user: { user_id: unknown }) => ({
          user_id: user.user_id,
        })),
      };

      const response = await addGroup({
        url: "/group-chats/add-user",
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response?.data?.status === "success") {
        close();
        toast.success("Users added to group successfully!");
      } else {
        toast.error(`${response?.error.data.message}`);
      }
      // if()
    } catch (error) {
      console.error("Error in adding user to group:", error);
    } finally {
      dispatch(clearGroupUsers());
    }
  };

  // for remove user
  const removeUserHandler = async () => {
    try {
      const payload = {
        group_chat_id: selectGroup?.groupId,
        users: usersId.map((user) => ({ user_id: user.user_id })),
      };

      const response = await addGroup({
        url: "/group-chats/remove-user",
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response?.data?.status === "success") {
        close();
        toast.success("Users remove to group successfully!");
      } else {
        toast.error(`${response?.error.data.message}`);
      }
      // if()
    } catch (error) {
      console.error("Error in removing user to group:", error);
    } finally {
      dispatch(clearGroupUsers());
    }
  };

  // for creating new group
  const [createGroup, setCreateGroup] = useState(false);
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
        {/* <p>
          {error.message}
        </p> */}
        <div className="flex md:flex-row flex-col items-center h-full justify-around gap-5">
          <div className="flex justify-around items-center h-full w-full">
            {!selectGroup.show && (
              <Switch
                onChange={(event: { currentTarget: { checked: boolean } }) =>
                  setAddUser(event.currentTarget.checked)
                }
                size="xl"
                onLabel="Add user"
                offLabel="Remove user"
              />
            )}
          </div>
          {!selectGroup.show ? (
            addUser ? (
              <Button
                onClick={() => {
                  if (usersId.length > 0) {
                    addGroupHandler();
                  }
                }}
                variant="outline"
                disabled={usersId.length === 0}
              >
                Confirm to add person
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (usersId.length > 0) {
                    removeUserHandler();
                  }
                }}
                color="red"
                variant="outline"
                disabled={usersId.length === 0}
              >
                Confirm to remove person
              </Button>
            )
          ) : createGroup ? (
            <Button
              onClick={() => setCreateGroup(!createGroup)}
              color="blue"
              variant="outline"
            >
              Back
            </Button>
          ) : (
            <Button
              onClick={() => setCreateGroup(!createGroup)}
              color="blue"
              variant="outline"
            >
              Create Group
            </Button>
          )}
        </div>
      </div>

      {createGroup ? (
        <CreateGroup close={close} />
      ) : selectGroup?.show ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {groupChatData?.data?.map(
            (el: Data, index: Key | null | undefined) => (
              <GroupChatMate
                setSelectGroup={setSelectGroup}
                close={close}
                parent="add_group"
                data={el}
                key={index}
              />
            )
          )}
        </div>
      ) : addUser ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {data?.data?.map((el: Data) => (
              <UserProfile
                close={close}
                parent="add_user"
                data={el}
                key={el.id}
              />
            ))}
          </div>
          <Pagination
            page={currentPage}
            // onLastPage={}
            onChange={handlePageChange}
            total={data?.meta?.total}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {groupUser?.data?.map((el: Data) => (
            <UserProfile
              close={close}
              parent="remove_user"
              data={el}
              key={el.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddChatMate;
