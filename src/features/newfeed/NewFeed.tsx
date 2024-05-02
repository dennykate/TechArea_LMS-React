/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader, Modal, Tooltip } from "@mantine/core";
import { TbTextPlus } from "react-icons/tb";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import UploadField from "./components/UploadField";
import { useDisclosure } from "@mantine/hooks";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import { usePostGetDataQuery } from "@/redux/api/postApi";

const NewFeed = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [latest, setLatest] = useState(true);
  const [opened, { open, close }] = useDisclosure();

  const {
    data: postData,
    isLoading,
    isFetching,
  } = usePostGetDataQuery(`/posts?limit=3&page=${page}`);


  const resetData = () => {
    setPosts([]);
    setPage(0);
  };

  useEffect(() => {
    if (postData?.data) {
      setPosts((prevPosts: any[]) => {
        const newPosts = postData.data.filter(
          (post: { id: any }) =>
            !prevPosts.some((prevPost) => prevPost.id === post.id)
        );
        return [...prevPosts, ...newPosts];
      });
      setHasMore(postData.meta.current_page < postData.meta.last_page);
    }
  }, [postData, latest]);

  const { get } = useEncryptStorage();
  const userData: {
    id: string;
    profile: null;
    gender: string | null;
    name: string;
  } = JSON.parse(get("userInfo") as string);

  const directChangeReaction = (
    postId: string,
    newReactType: any,
    type: string = "add"
  ) => {
    setPosts((prevPosts: any) => {
      const postIndex = prevPosts.findIndex((post: any) => post.id === postId);

      if (postIndex === -1) return prevPosts;

      const newPosts = [...prevPosts];
      const updatedPost = { ...newPosts[postIndex] };

      const reactions = { ...updatedPost.reactions };

      delete updatedPost.reactions;

      if (type === "add") {
        // Create a new is_reactor object instead of mutating the existing one
        updatedPost.is_reactor = {
          ...updatedPost.is_reactor,
          type: newReactType,
          post_id: postId,
          user_id: userData.id,
        };

        if (updatedPost.is_reactor) {
          updatedPost["reactions"] = {
            ...reactions,
            [`${updatedPost.is_reactor.type}`]:
              reactions[`${updatedPost.is_reactor.type}`] - 1,
            [`${newReactType}`]: reactions[`${newReactType}`] + 1,
          };
        } else {
          updatedPost["reactions"] = {
            ...reactions,
            [`${newReactType}`]: reactions[`${newReactType}`] + 1,
          };
        }
      } else {
        // Create a new is_reactor object instead of mutating the existing one

        updatedPost["reactions"] = {
          ...reactions,
          [`${updatedPost.is_reactor.type}`]:
            reactions[`${updatedPost.is_reactor.type}`] - 1,
        };

        updatedPost.is_reactor = null;
      }

      newPosts[postIndex] = updatedPost;

      return newPosts;
    });
  };

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
        className="h-[100%] overflow-scroll overflow-x-hidden scrollbar-none w-[90%] md:w-[60%]"
      >
        <InfiniteScroll
          dataLength={posts?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <h4 className=" w-full flex justify-center my-5">
              <Loader color="blue" />
            </h4>
          }
          endMessage={
            <p
              className="text-gray-500/40 my-5"
              style={{ textAlign: "center" }}
            >
              <b>-end-</b>
            </p>
          }
          scrollableTarget="scrollableDiv"
        >
          <div className="flex flex-col gap-5 items-center">
            <AddPost latest={latest} setLatest={setLatest} />
            {posts?.map((el: any) => (
              <Post
                directChangeReaction={directChangeReaction}
                resetData={resetData}
                key={el.id}
                data={el}
                parent="newfeed"
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <Tooltip label="post upload">
        <div
          onClick={open}
          className="text-3xl hidden cursor-pointer w-16 h-16 hover:bg-blue-400 bg-blue-500 text-white font-bold md:flex justify-center items-center rounded-full absolute right-10 bottom-10"
        >
          <TbTextPlus />
        </div>
      </Tooltip>
      {/* for post upload model  */}
      <Modal
        centered
        size={"lg"}
        opened={opened}
        onClose={close}
        title="Post Upload"
      >
        <UploadField latest={latest} setLatest={setLatest} close={close} />
      </Modal>
    </div>
  );
};

export default NewFeed;
