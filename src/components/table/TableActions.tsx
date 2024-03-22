/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCircleInfo } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { ActionIcon } from "@mantine/core";
import alertActions from "@/utilities/alertActions";
import useDisableUI from "@/hooks/useDisableUI";
import { MouseEvent } from "react";

interface PropsType {
  detail?: boolean | string;
  edit?: boolean | string;
  destroy?: boolean | string;
  detailCb?: () => void; // Cb means call back function
  editCb?: () => void;
  destroyCb?: () => void;
  destroyRoles?: string[];
  editRoles?: string[];
  detailRoles?: string[];
}

const TableActions = ({
  detail = true,
  edit = true,
  destroy = true,
  detailCb,
  editCb,
  destroyCb,
  destroyRoles = ["manager", "cashier"],
  editRoles = ["manager", "cashier"],
  detailRoles = ["manager", "cashier"],
}: PropsType) => {
  const check = useDisableUI();

  const onClickHandler = (
    e: MouseEvent<HTMLButtonElement, MouseEvent>,
    callback: (() => void) | undefined
  ) => {
    e.stopPropagation();
    if (callback) callback();
  };

  return (
    <td className="m_td">
      <div className="w-full  flex items-center gap-2">
        {detail && check(detailRoles) && (
          <ActionIcon
            onClick={(e) => {
              onClickHandler(e as any, detailCb);
            }}
            size="lg"
            variant="filled"
            className="bg-green-500 hover:!bg-primary-500"
          >
            <FaCircleInfo size="1rem" />
          </ActionIcon>
        )}

        {edit && check(editRoles) && (
          <ActionIcon
            onClick={(e) => {
              onClickHandler(e as any, editCb);
            }}
            size="lg"
            variant="filled"
            className="bg-orange-400 hover:!bg-primary-500"
          >
            <BiEdit size="1.2rem" />
          </ActionIcon>
        )}

        {destroy && check(destroyRoles) && (
          <ActionIcon
            onClick={(e) => {
              onClickHandler(e as any, () => {
                alertActions(destroyCb as () => void, "ဖျက်ဖို့ သေချာသလား");
              });
            }}
            size="lg"
            variant="filled"
            className="bg-red-500 hover:!bg-primary-500"
          >
            <FaTrash size="0.9rem" />
          </ActionIcon>
        )}
      </div>
    </td>
  );
};

export default TableActions;
