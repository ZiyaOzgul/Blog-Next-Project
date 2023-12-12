"use client";

import { setCurrentPost, setPageLevelLoading } from "@/redux/blogSlicer";
import { getSelectedPostAsync } from "@/services/posts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import Carousel from "@/components/Carousel";

const page = ({ params }) => {
  const [carousel, setCarousel] = useState(0);

  const nextSlide = () => {
    setCarousel(
      (prevSlide) => (prevSlide + 1) % currentRenderingPost.postImg.length
    );
  };

  const prevSlide = () => {
    setCarousel(
      (prevSlide) =>
        (prevSlide - 1 + currentRenderingPost.postImg.length) %
        currentRenderingPost.postImg.length
    );
  };
  const id = params.id;

  const dispatch = useDispatch();

  const pageLoader = useSelector((state) => state.blog.pageLevelLoader);
  const currentRenderingPost = useSelector((state) => state.blog.currentPost);

  useEffect(() => {
    handleGetCurrentPost(id);
  }, []);

  const handleGetCurrentPost = async (postID) => {
    dispatch(setPageLevelLoading(true));
    const returnData = await getSelectedPostAsync(postID);
    if (returnData.success) {
      dispatch(setCurrentPost(returnData.data));
      dispatch(setPageLevelLoading(false));
    } else {
      dispatch(setPageLevelLoading(false));
      toast.error(returnData.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    console.log(returnData);
  };

  if (pageLoader || currentRenderingPost.length == 0) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  } else {
    const createdAtTime = currentRenderingPost.createdAt.split("T")[0];
    return (
      <div className="w-screen h-auto flex items-start justify-center md:my-4">
        <div className="w-8/12 h-auto flex flex-col items-start justify-start md:space-y-6">
          <div className="w-full h-60v overflow-hidden rounded-xl relative">
            {/* <img
              src={currentRenderingPost.postImg[carousel]}
              alt=""
              className={`w-full h-full  object-cover  translate-x-[${carousel}*100]`}
            /> */}
            <Carousel
              slides={currentRenderingPost.postImg}
              currentSlide={carousel}
            />
            <ArrowRightIcon
              className="h-8 w-8 text-gray-500 hover:translate-x-2 ease-in-out duration-300 absolute right-4 bottom-1/2 cursor-pointer "
              onClick={() => nextSlide()}
            />
            <ArrowLeftIcon
              className="h-8 w-8 text-gray-500 hover:-translate-x-2 ease-in-out duration-300 absolute left-4 bottom-1/2 cursor-pointer"
              onClick={() => prevSlide()}
            />
          </div>
          <div className="w-full h-auto flex flex-col items-start justify-start md:space-y-6 border border-gray-300 shadow-xl shadow-gray-300 rounded-2xl p-6">
            <h1 className="text-bold text-2xl text-neutral-900">
              {currentRenderingPost.postTitle}
            </h1>
            <p className="text-medium text-lg text-neutral-800">
              {currentRenderingPost.postDescription}
            </p>
            <p className="text-sm">{currentRenderingPost.postDetail}</p>
            <div className="w-full h-10v flex items-end justify-end space-x-6   ">
              <div className="flex items-center  space-x-1 group">
                <HeartIcon className="w-6 h-6 text-red-500 group-hover:text-red-600 group-hover:scale-110 ease-in-out duration-300 " />
                <p className="text-sm group-hover:translate-x-2 ease-in duration-300">
                  {currentRenderingPost.postLike}
                </p>
              </div>
              <div className="flex items-start justify-center">
                <p className="text-lg">
                  {currentRenderingPost.creatorName}{" "}
                  <i className="text-4xl">.</i> {createdAtTime}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default page;
