"use client";

import PostCard from "@/components/PostCard";
import { setAllPosts, setPageLevelLoading } from "@/redux/blogSlicer";
import { getAllPostsAsync } from "@/services/posts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const page = () => {
  const dispatch = useDispatch();
  const router = typeof window !== "undefined" ? useRouter() : null;
  const allPosts = useSelector((state) => state.blog.posts);
  const PageLoader = useSelector((state) => state.blog.pageLevelLoader);
  useEffect(() => {
    handleGetAllPosts();
  }, []);

  const handleGetAllPosts = async () => {
    dispatch(setPageLevelLoading(true));
    const getAllPostsReq = await getAllPostsAsync();
    if (getAllPostsReq.success) {
      console.log(getAllPostsReq.data);
      dispatch(setAllPosts(getAllPostsReq.data));
      dispatch(setPageLevelLoading(false));
    } else {
      toast.error(getAllPostsReq.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  if (PageLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={PageLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  } else {
    return (
      <div className="w-full h-auto flex items-center justify-center md:my-6">
        <div className="w-8/12 h-auto grid grid-cols-3 gap-6 ">
          {allPosts.map((post) => (
            <PostCard item={post} />
          ))}
        </div>
      </div>
    );
  }
};

export default page;
