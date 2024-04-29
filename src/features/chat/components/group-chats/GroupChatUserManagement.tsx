/* eslint-disable @typescript-eslint/no-explicit-any */
import Heading from "@/components/typography/Heading";
import { Switch } from "@mantine/core";
import { useState } from "react";
import AddUser from "./AddUser";
import RemoveUser from "./RemoveUser";

interface PropsType {
  groupChatId: string;
  onClose: () => void;
}

const GroupChatUserManagement: React.FC<PropsType> = ({
  groupChatId,
  onClose,
}) => {
  const [value, setValue] = useState<boolean>(true);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Heading tag="h4">
          Group Chat User Management ( {value ? "Add" : "Remove"} )
        </Heading>

        <Switch
          size="xl"
          onLabel="Add user"
          offLabel="Remove user"
          checked={value as any}
          onChange={(e) => {
            setValue(e.target.checked);
          }}
        />
      </div>

      <div className="mt-5">
        {value ? (
          <AddUser groupChatId={groupChatId} onSuccess={onClose} />
        ) : (
          <RemoveUser groupChatId={groupChatId} onSuccess={onClose} />
        )}
      </div>
    </div>
  );
};

export default GroupChatUserManagement;
