import useMutate from "@/hooks/useMutate";
import alertActions from "@/utilities/alertActions";
import { IconTrashFilled } from "@tabler/icons-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface PropsType {
  attachments: any;
}

const Attachments: React.FC<PropsType> = ({ attachments }) => {
  const [onSubmit] = useMutate();

  return (
    <div className="w-full space-y-2 my-4">
      <label htmlFor="text-editor" className="font-medium mb-2">
        Lessons
      </label>

      {attachments?.map((attachment: any) => (
        <div className="w-full flex justify-between">
          <p className="text-sm font-[400]">{attachment?.url}</p>

          <button
            type="button"
            onClick={() =>
              alertActions(
                () =>
                  onSubmit(
                    `/assignments/${attachment?.id}/attachment-delete`,
                    {},
                    "DELETE"
                  ),
                "Are you sure to delete ?"
              )
            }
            className=" bg-red-500 p-2 rounded-md hover:bg-red-700"
          >
            <IconTrashFilled color="white" size={18} />

            <p className="sr-only">Delete Button</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Attachments;
