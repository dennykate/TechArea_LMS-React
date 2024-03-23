/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionIcon, Menu } from "@mantine/core";
import alertActions from "@/utilities/alertActions";
// import useDisableUI from "@/hooks/useDisableUI";
import { MouseEvent } from "react";
import {
  IconInfoCircle,
  IconTrash,
  IconPencilMinus,
  IconDotsVertical,
} from "@tabler/icons-react";

interface PropsType {
  detailCb?: () => void; // Cb means call back function
  editCb?: () => void;
  destroyCb?: () => void;
  destroyRoles?: string[];
  editRoles?: string[];
  detailRoles?: string[];
}

const TableActions = ({
  detailCb,
  editCb,
  destroyCb,
}: // destroyRoles = ["manager", "cashier"],
// editRoles = ["manager", "cashier"],
// detailRoles = ["manager", "cashier"],
PropsType) => {
  // const check = useDisableUI();

  const onClickHandler = (
    e: MouseEvent<HTMLButtonElement, MouseEvent>,
    callback: (() => void) | undefined
  ) => {
    e.stopPropagation();
    if (callback) callback();
  };

  return (
    <div className="w-full flex items-center pl-4">
      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <ActionIcon>
            <IconDotsVertical size={20} color="black" />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {detailCb && (
            <Menu.Item
              icon={<IconInfoCircle size={14} />}
              onClick={(e) => onClickHandler(e as any, detailCb)}
            >
              Details
            </Menu.Item>
          )}

          {editCb && (
            <Menu.Item
              icon={<IconPencilMinus size={14} />}
              onClick={(e) => onClickHandler(e as any, editCb)}
            >
              Edit
            </Menu.Item>
          )}

          {destroyCb && (
            <>
              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="red"
                icon={<IconTrash size={14} />}
                onClick={(e) =>
                  onClickHandler(e as any, () => {
                    alertActions(
                      destroyCb as () => void,
                      "Are you sure to delete"
                    );
                  })
                }
              >
                Delete
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default TableActions;
