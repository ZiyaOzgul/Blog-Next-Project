"use client";
import { setPageLevelLoading } from "@/redux/blogSlicer";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";

const page = ({ params }) => {
  const userID = params.id;

  const currentUser = useSelector((state) => state.blog.user);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetUserDetails(userID);
  }, [userID]);

  const formik = useFormik({
    initialValues: {
      profileDetails: "",
      birthDate: "",
      profileImg: "",
    },
  });

  const handleGetUserDetails = async (userID) => {
    // dispatch(setPageLevelLoading(true))
    // const userData = await
  };

  return (
    <div className="w-screen h-auto flex items-start justify-start my-6 px-10 space-x-2 relative ">
      <div className="w-3/4 flex flex-col items-start justify-start">
        <div className="w-full max-h-[%40] p-6 border-2 border-neutral-900 rounded-xl flex flex-col items-start justify-start">
          {/* if user data is null */}
          {/* <div className="w-full h-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold text-neutral-800">
              Profile Details
            </h1>
            <PlusCircleIcon className="h-10 w-10 text-gray-500  hover:text-neutral-800 hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer" />
          </div>
          <p className="w-full text-lg text-neutral-900 my-4">
            Please enter profile update.
          </p> */}
          <div className="w-full h-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold text-neutral-800">
              Profile Details
            </h1>
            <PlusCircleIcon className="h-10 w-10 text-gray-500  hover:text-neutral-800 hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer" />
          </div>
          <p className="w-full text-lg text-neutral-800 "></p>
        </div>
      </div>
      <div className="w-1/4 flex flex-col items-start justify-start">
        <div className="flex flex-col items-start justify-start p-6 rounded-xl border-2 border-neutral-900 w-full max-h-[%40]">
          <div className="w-full h-10v flex items-center justify-center">
            <img src="" alt="" className="rounded-full h-full my-2" />
          </div>
          <h1 className="w-full text-lg text-neutral-900 mt-2">
            {currentUser.name}
          </h1>
          <p className="text-neutral-800 text-sm mt-2">{currentUser.email}</p>
        </div>
      </div>
      {/* navbar */}
      <div
        className={` absolute -top-32 -left-2   w-full h-100v flex items-center justify-center bg-black/30 z-20`}
      >
        <div className="w-full h-full flex flex-col items-center justify-between px-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
            <div className="w-full mt-10 relative max-w-2xl lg:mt-0 lg:w-10/12 rounded-lg overflow-hidden">
              <div className=" flex flex-col items-center justify-start p-10 bg-white shadow-2xl relative z-10">
                <p className="w-full text-4xl font-medium text-center font-serif">
                  Profile Details
                </p>

                <form
                  className=" w-7/12  mt-12 space-y-8"
                  onSubmit={formik.handleSubmit}
                >
                  {/* Detail */}
                  <div className="relative">
                    <p
                      className={` pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium  bg-white ${
                        formik.touched.profileDetails &&
                        Boolean(formik.errors.profileDetails)
                          ? "text-purple-500"
                          : "text-neutral-600"
                      }`}
                    >
                      User Description
                    </p>
                    <input
                      placeholder={"Describe yourself"}
                      type={"text"}
                      name="profileDetails"
                      id="profileDetails"
                      className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                      value={formik.values.profileDetails}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.profileDetails &&
                    Boolean(formik.errors.profileDetails) ? (
                      <div className="mt-1 text-sm text-purple-600">
                        {formik.errors.profileDetails}{" "}
                      </div>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
