/* eslint-disable @typescript-eslint/no-explicit-any */
import MyCarousel from "@/components/common/MyCarousel";
import useMutate from "@/hooks/useMutate";
import alertActions from "@/utilities/alertActions";
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

      <MyCarousel slides={data} onDelete={handleDelete} isLoading={isLoading} />
    </section>
  );
};

export default ClassRoomImages;
