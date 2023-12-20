"use client";
import { setPageLevelLoading } from "@/redux/blogSlicer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

const page = ({ params }) => {
  const userID = params.id;

  const pageLoader = useSelector((state) => state.blog.pageLevelLoader);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetUserData();
  }, [userID]);

  const handleGetUserData = async () => {
    dispatch(setPageLevelLoading(true));
  };
  if (pageLoader) {
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
    return <div>{userID}</div>;
  }
};

export default page;
