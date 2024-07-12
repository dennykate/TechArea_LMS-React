/* eslint-disable @typescript-eslint/no-explicit-any */

import alertActions from "@/utilities/alertActions";
// import useDisableUI from "@/hooks/useDisableUI";
import { MouseEvent } from "react";
import {
  IconInfoCircle,
  IconTrash,
  IconPencilMinus,
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
    <div className="w-full flex items-center gap-1">
      {detailCb && (
        <button
          onClick={(e) => onClickHandler(e as any, detailCb)}
          className="w-6 h-6 rounded-sm flex justify-center items-center text-white bg-green-400"
        >
          <IconInfoCircle size={14} />
        </button>
      )}

      {editCb && (
        <button
          onClick={(e) => onClickHandler(e as any, editCb)}
          className="w-6 h-6 rounded-sm flex justify-center items-center text-white bg-blue-400"
        >
          <IconPencilMinus size={14} />
        </button>
      )}

      {destroyCb && (
        <>
          <button
            onClick={(e) =>
              onClickHandler(e as any, () => {
                alertActions(destroyCb as () => void, "Are you sure to delete");
              })
            }
            className="w-6 h-6 rounded-sm flex justify-center items-center text-white bg-red-400"
          >
            <IconTrash size={14} />
          </button>
        </>
      )}
    </div>
  );
};

export default TableActions;
