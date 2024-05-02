/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePostDataMutation } from "@/redux/api/queryApi";
import { Avatar } from "@mantine/core";
import React, { Key } from "react";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
interface CommentProps {
  data: {
    content: string;
    created_at: string;
    created_at_time: string;
    id: Key | null | undefined;
    is_owner: boolean;
    user_name: string;
    user_profile: string;
  };
}

const Comments: React.FC<CommentProps> = ({ data }) => {
  // console.log(data);
  const [deleteComment] = usePostDataMutation();

  const deleteCommentHandler = async () => {
    const willDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (willDelete.isConfirmed) {
      try {
        const response = (await deleteComment({
          url: `/comments/${data?.id}`,
          method: "DELETE",
        })) as any;

        if (response?.data?.status === "success") {
          Swal.fire("Deleted!", "Your comment has been deleted.", "success");
          // Optionally reset state or fetch new comments here
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Failed!", "Failed to delete the comment.", "error");
      }
    }
  };

  return (
    <div className="flex w-full justify-between gap-3 items-center text-gray-500">
      <div className="flex gap-3 justify-between items-center ">
        <Avatar radius={"100%"} size={"lg"} src={data?.user_profile} />

        <div className="flex flex-col">
          <h1 className="text-lg text-gray-800">{data?.user_name}</h1>
          <p className="text-md">{data?.content}</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center">
        {data?.is_owner && (
          <div
            onClick={deleteCommentHandler}
            className="text-red-600 self-end cursor-pointer transition duration-100 "
          >
            <BiTrash size={18} />
          </div>
        )}
        <span className="text-xs">{data?.created_at}</span>
      </div>
    </div>
  );
};

export default Comments;
