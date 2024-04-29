/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/typography/Heading";
import { Switch } from "@mantine/core";
import { useState } from "react";
import AddUser from "./AddUser";
import RemoveUser from "./RemoveUser";

const GroupChatUserManagement = () => {
  const [value, setValue] = useState<boolean>(true);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Heading tag="h4">Group Chat User Management </Heading>

        <Switch
          size="xl"
          onLabel="Add user"
          offLabel="Remove user"
          value={value as any}
          onChange={(e) => {
            setValue(e.target.checked);
          }}
        />
      </div>

      <div className="mt-5">{value ? <AddUser /> : <RemoveUser />}</div>
    </div>
  );
};

export default GroupChatUserManagement;
