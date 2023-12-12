"use client";

import PostCard from "@/components/PostCard";
import { setAllPosts } from "@/redux/blogSlicer";
import { getAllPostsAsync } from "@/services/posts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const dispatch = useDispatch();
  const router = typeof window !== "undefined" ? useRouter() : null;
  const allPosts = useSelector((state) => state.blog.posts);

  useEffect(() => {
    handleGetAllPosts();
  }, []);

  const handleGetAllPosts = async () => {
    const getAllPostsReq = await getAllPostsAsync();
    if (getAllPostsReq.success) {
      console.log(getAllPostsReq.data);
      dispatch(setAllPosts(getAllPostsReq.data));
    } else {
      toast.error(getAllPostsReq.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="w-full h-auto flex items-center justify-center md:my-6">
      <div className="w-8/12 h-auto grid grid-cols-3 gap-6 ">
        {allPosts.map((post) => (
          <PostCard item={post} />
        ))}
      </div>
    </div>
  );
};

export default page;
