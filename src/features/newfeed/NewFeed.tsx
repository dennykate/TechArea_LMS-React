/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader, Tooltip } from "@mantine/core";
import { TbTextPlus } from "react-icons/tb";
import { Link } from "react-router-dom";
import AddPost from "./components/AddPost";
import { useGetDataQuery } from "@/redux/api/queryApi";
import Post from "./components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const NewFeed = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: postData,
    isLoading,
    isFetching,
  } = useGetDataQuery(`/posts?limit=3&page=${page}`);

  console.log(posts);

  useEffect(() => {
    if (postData?.data) {
      setPosts((prevPosts: any[]) => {
        const newPosts = postData.data.filter(
          (post: { id: any; }) => !prevPosts.some((prevPost) => prevPost.id === post.id)
        );
        return [...prevPosts, ...newPosts];
      });
      setHasMore(postData.meta.current_page < postData.meta.last_page);
    }
  }, [postData]);

  const fetchMoreData = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // console.log(postData);
  // Loading indicator
  if (isLoading && !isFetching && posts.length === 0)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader color="blue" />
      </div>
    );

  return (
    <div className="w-full flex h-[calc(100vh-120px)] justify-center items-center relative">
      <div
        id="scrollableDiv"
        className="h-[100%] overflow-scroll scrollbar-none w-[90%] md:w-[60%]"
      >
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <h4 className=" w-full flex justify-center my-5">
              <Loader color="blue" />
            </h4>
          }
          endMessage={
            <p className="text-gray-500/40 my-5" style={{ textAlign: "center" }}>
              <b>-end-</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          <div className="flex flex-col gap-5 items-center">
            <AddPost />
            {posts.map((el: any) => (
              <Post key={el.id} data={el} parent="newfeed" />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <Tooltip label="post upload">
        <Link
          to={"/upload"}
          className="text-3xl hidden cursor-pointer w-16 h-16 hover:bg-blue-400 bg-blue-500 text-white font-bold md:flex justify-center items-center rounded-full absolute right-10 bottom-10"
        >
          <TbTextPlus />
        </Link>
      </Tooltip>
    </div>
  );
};

export default NewFeed;
