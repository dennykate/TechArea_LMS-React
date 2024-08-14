/* eslint-disable @typescript-eslint/no-explicit-any */
import ModalImage from "@/components/ModalImage";
import useMutate from "@/hooks/useMutate";
import alertActions from "@/utilities/alertActions";
import { IconTrashFilled } from "@tabler/icons-react";
import React from "react";

interface PropsType {
  data: any[];
}

const ClassRoomImages: React.FC<PropsType> = ({ data }) => {
  const [onSubmit, { isLoading }] = useMutate();

  const handleDelete = (id: string) => {
    alertActions(
      () => onSubmit(`/zoom-records/${id}/attachment`, null, "DELETE"),
      "Are you sure to delete"
    );
  };

  return (
    <section>
      <h6 className="sm:text-[16px] text-[14px] mb-1">Classroom Images</h6>
      <div className="grid grid-cols-3 gap-3">
        {data?.map((dt: any) => (
          <ModalImage key={dt?.id} imageURL={dt?.url}>
            <div className="w-full h-[170px] rounded-md overflow-hidden relative">
              <img
                src={dt?.url}
                alt="img"
                className="w-full h-full object-cover"
              />

              <button
                disabled={isLoading}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(dt?.id);
                }}
                className="absolute bottom-2 right-2 bg-red-500 p-2 rounded-md hover:bg-red-700"
              >
                <IconTrashFilled color="white" size={18} />

                <p className="sr-only">Delete Button</p>
              </button>
            </div>
          </ModalImage>
        ))}
      </div>
    </section>
  );
};

export default ClassRoomImages;
