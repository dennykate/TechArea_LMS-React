/* eslint-disable @typescript-eslint/no-explicit-any */
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import { usePostDataMutation } from "@/redux/api/queryApi";
import { Avatar } from "@mantine/core";
import React, { Key } from "react";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
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
  setPosts: any;
  postId: string;
}

const Comments: React.FC<CommentProps> = ({ data, setPosts, postId }) => {
  const { get } = useEncryptStorage();
  const [deleteComment] = usePostDataMutation();
  console.log(data);

  const userData = JSON.parse(get("userInfo") as any);

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

          setPosts((posts: any) => {
            return posts?.map((post: any) => {
              if (post.id == postId) {
                return { ...post, comment_count: post.comment_count - 1 };
              }

              return post;
            });
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Failed!", "Failed to delete the comment.", "error");
      }
    }
  };

  return (
    <div
      className={twMerge(
        "flex w-full  gap-3 items-center text-gray-500 ",
        data?.content?.length > 50 ? "justify-end flex-wrap" : "justify-between"
      )}
    >
      <div className="flex sm:gap-3 gap-2 justify-between items-start ">
        <Avatar radius={"100%"} size={"lg"} src={data?.user_profile} />

        <div className="flex flex-col">
          <h1 className="sm:text-base text-sm text-gray-800 font-[500]">
            {data?.user_name}
          </h1>
          <p className="sm:text-sm text-xs">{data?.content}</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center pt-4 ">
        {data?.is_owner || userData.role_id == "3" ? (
          <div
            onClick={deleteCommentHandler}
            className="text-red-600 self-end cursor-pointer transition duration-100 "
          >
            <BiTrash size={18} />
          </div>
        ) : (
          <div />
        )}
        <span className="sm:text-xs text-[10px]">{data?.created_at}</span>
      </div>
    </div>
  );
};

export default Comments;
