/* eslint-disable @typescript-eslint/no-explicit-any */

import MyButton from "@/components/buttons/MyButton";
import useMutate from "@/hooks/useMutate";
import useQuery from "@/hooks/useQuery";
import { Avatar, Loader } from "@mantine/core";
import { Interweave } from "interweave";
import BetterChange from "@/assets/better-change-text-logo.png";

import { Link } from "react-router-dom";
interface PropsType {
  pendingClose: () => void;
}
const PendingPost = ({ pendingClose }: PropsType) => {
  const { data, isLoading } = useQuery(`/posts?filter[status]=pending`);

  const [onSubmit] = useMutate({
    navigateBack: false,
    callback: () => {
      pendingClose();
    },
  });

  const onSubmitHandler = (id: string) => {
    onSubmit(`/posts/make-public/${id}`, null, "POST", true);
  };
  return (
    <div className="w-full">
      {isLoading && (
        <div className="w-full h-[200px] flex justify-center items-center">
          <Loader size="md" />
        </div>
      )}

      <div className="max-h-[70vh] overflow-y-auto pr-4  space-y-5">
        {data?.length > 0 ? (
          data?.map((post: any) => (
            <div
              key={post?.id}
              className="flex flex-col gap-2 w-full border rounded shadow-md px-2 py-2 overflow-hidden relative"
            >
              <MyButton
                onClick={() => onSubmitHandler(post?.id)}
                className="!w-[70px] !h-[30px] absolute sm:top-2 sm:right-2 right-3 top-3 !px-1 !text-xs !font-normal"
              >
                Approve
              </MyButton>
              <div className="flex items-center gap-4 sm:flex-row flex-col">
                {post?.image ? (
                  <img
                    src={post?.image}
                    alt="post thumnnail"
                    className="sm:min-w-[200px] w-full h-[150px] object-cover"
                  />
                ) : (
                  <img
                    src={BetterChange}
                    alt="logo"
                    className="sm:min-w-[200px] w-full  object-cover"
                  />
                )}

                <div className="flex flex-col h-full gap-2 w-full ">
                  <p className=" truncate sm:text-[13px] text-[11px] text-gray-500 ">
                    <Interweave content={post?.content} />
                  </p>
                  <p className="sm:text-[13px] text-[11px] text-gray-500 ">
                    {post?.comment_count} Comments
                  </p>

                  <div className="flex items-center gap-2 sm:text-[13px] text-[11px] text-gray-500">
                    <span>{post?.reactions?.best} Best</span>
                    <span>{post?.reactions?.good} Good</span>
                    <span>{post?.reactions["not bad"]} Not Bad</span>
                    <span>{post?.reactions?.bad} Bad</span>
                  </div>

                  <Link
                    to={`/accounts/students/details/${post?.creator?.id}`}
                    className="flex items-center gap-2"
                  >
                    <Avatar size={"md"} src={post?.creator?.profile} />
                    <p className="sm:text-[13px] text-[11px] text-gray-800 ">
                      {post?.creator?.name} , {post?.creator?.grade} ,{" "}
                      {post?.creator?.section}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[300px] flex justify-center  items-center">
            <p>No pending post available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingPost;
