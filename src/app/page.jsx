"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PostCard from "../components/PostCard";
import { getAllPostsAsync } from "../services/posts";
import { toast } from "react-toastify";
import { setAllPosts } from "../redux/blogSlicer";
const Home = () => {
  const dispatch = useDispatch();
  const Loader = useSelector((state) => state.blog.componentLevelLoader);

  const allPosts = useSelector((state) => state.blog.posts);

  useEffect(() => {
    handleGetAllPosts();
    console.log("Load all posts");
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
    <div className="w-full h-auto flex flex-col items-center justify-start mt-4">
      <div className="w-11/12 h-65v items-center justify-center relative bg-red-400 group rounded-xl overflow-hidden cursor-pointer">
        <img
          src="https://assets-global.website-files.com/6467d96400e84f307e2196ef/6467d96400e84f307e21a8d7_Best%20Photography%20Blogs%20-%20Wrapbook%20-%20We%20Eat%20Together.jpeg"
          alt=""
          className="w-full h-full group-hover:scale-110 ease-in-out duration-300 object-cover object-center "
        />
        <div className="absolute left-[4%] bottom-[10%] flex flex-col items-start justify-start md:space-y-4 group-hover:-translate-x-2 ease-in-out duration-300 z-10">
          <p className="text-lg text-white">Feautered</p>
          <h1 className="max-w-4xl text-4xl font-medium text-white">
            Breaking Into product design: Advice from untitled founder frankie
          </h1>
          <p className="text-white text-sm max-w-6xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo sunt
            minima molestias, dolor magni aliquam expedita ab in iste
            exercitationem id architecto tenetur totam maiores aspernatur
            ratione fugit quidem quae.
          </p>
        </div>
        {/* <div className="w-1/12 h-full absolute right-0 top-0 bg-gradient-to-r from-slate-50/20 to-slate-800/40 shadow-2xl"></div> */}
        <div className="absolute right-4 bottom-1/2 group-hover:-translate-x-8  scale-125  group-hover:scale-150 transition-all ease-in-out duration-300 z-10">
          <ArrowForwardIcon className="text-white" />
        </div>
      </div>
      <div className="w-full h-auto flex flex-col items-center justify-start md:mt-8">
        <h1 className="text-2xl font-semibold text-neutral-900 w-9/12 px-6">
          Recent blog posts
        </h1>
        <div className="w-9/12 h-auto p-6 grid grid-cols-3 gap-3  mt-4">
          {allPosts.map((item) => (
            <PostCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
