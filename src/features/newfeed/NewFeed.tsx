/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader, Modal, Tooltip } from "@mantine/core";
import { TbTextPlus } from "react-icons/tb";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef, useState } from "react";
import UploadField from "./components/UploadField";
import { useDisclosure } from "@mantine/hooks";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
// import { usePostGetDataQuery } from "@/redux/api/postApi";
import useQuery from "@/hooks/useQuery";
import { Logo } from "@/components";
import MyButton from "@/components/buttons/MyButton";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

const NewFeed = () => {
  const postContainerRef = useRef<any>();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [latest, setLatest] = useState(true);
  const [opened, { open, close }] = useDisclosure();

  const {
    // data: postData,
    isLoading,
    // isFetching,
  } = useQuery(`/posts?limit=10&page=${page}`, (data: any, meta: any) => {
    if (data) {
      // console.log("response => ", data);

      // setPosts((prev: any[]) => {
      //   const newData = data.filter(
      //     (newItem: any) => !prev.some((prevItem) => prevItem.id === newItem.id)
      //   );

      //   return [...prev, ...newData];
      // });

      setPosts((prev: any[]) => {
        const prevItemsMap = new Map(prev.map((item) => [item.id, item]));

        data.forEach((newItem: any) => {
          if (!prevItemsMap.has(newItem.id)) {
            prevItemsMap.set(newItem.id, newItem);
          }
        });

        // Convert the map back to an array
        return Array.from(prevItemsMap.values());
      });

      if (page < meta.last_page) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  });

  const resetData = () => {
    setPosts([]);
    setPage(0);
  };

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

  console.log("page => ", page);

  const fetchMoreData = () => {
    console.log("isLoading => ", isLoading);
    console.log("hasMore => ", hasMore);
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // console.log(postData);
  // Loading indicator
  if (isLoading && posts.length === 0)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader color="blue" />
      </div>
    );

  return (
    <div>
      <div
        className="w-full h-[60px] sticky top-0 px-4 flex items-center 
      border-b shadow-md bg-white z-[100] flex justify-between items-center"
      >
        <Logo />

        <Link to={"/dashboard"}>
          <MyButton size="sm">
            <span className="sm:block hidden">Back To Dashboard</span>

            <MdHome size={23} />
          </MyButton>
        </Link>
      </div>

      <div className="w-full flex justify-center items-center ">
        <div
          id="scrollableDiv"
          ref={postContainerRef}
          className="overflow-scroll overflow-x-hidden scrollbar-none
          w-[95%] lg:w-[50%] sm:w-[80%]"
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
              <AddPost
                latest={latest}
                setLatest={setLatest}
                setPosts={setPosts}
              />
              {posts?.map((el: any) => (
                <Post
                  directChangeReaction={directChangeReaction}
                  resetData={resetData}
                  key={el.id}
                  data={el}
                  parent="newfeed"
                  setPosts={setPosts}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>

        <Tooltip label="post upload">
          <div
            onClick={open}
            className="text-3xl hidden cursor-pointer w-16 h-16 hover:bg-blue-400 
            bg-blue-500 text-white font-bold md:flex justify-center items-center
             rounded-full fixed right-10 bottom-10"
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
          <UploadField
            latest={latest}
            setLatest={setLatest}
            close={() => {
              close();

              if (postContainerRef.current) {
                postContainerRef.current.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }
            }}
            setPosts={setPosts}
          />
        </Modal>
      </div>
    </div>
  );
};

export default NewFeed;
