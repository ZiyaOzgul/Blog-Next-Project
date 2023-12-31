"use client";

import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validationSchema } from "./validation";

import { useRouter } from "next/navigation";
import { setComponentLevelLoader } from "@/redux/blogSlicer";
import { registerNewUser } from "@/services/register";
import { toast } from "react-toastify";
import Notification from "@/components/notification/Notification";
import ComponentLevelLoader from "@/components/componentLevelLoader/ComponentLevelLoader";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const router = typeof window !== "undefined" ? useRouter() : null;
  const Loader = useSelector((state) => state.blog.componentLevelLoader);
  const currentUser = useSelector((state) => state.blog.user);

  useEffect(() => {
    console.log(currentUser, currentUser.length);
    if (currentUser.length !== 0) {
      router.push("/");
    }
  }, [currentUser]);

  const formik = useFormik({
    initialValues: {
      userName: "",
      userMail: "",
      userPassword: "",
    },
    onSubmit: (e) => {
      console.log(e);
      handleSubmit(e);
    },
    validationSchema: validationSchema,
  });

  const handleSubmit = async (formData) => {
    dispatch(
      setComponentLevelLoader({
        loading: true,
        id: "",
      })
    );
    const data = await registerNewUser(formData);
    if (data.success) {
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(
        setComponentLevelLoader({
          loading: false,
          id: "",
        })
      );
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      dispatch(
        setComponentLevelLoader({
          loading: false,
          id: "",
        })
      );
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="bg-white relative  ">
      <div className=" flex flex-col items-center justify-between px-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className=" flex flex-col items-center justify-start p-10 bg-white shadow-2xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Re<i className="text-purple-600">g</i>ister N
                <i className="text-purple-400">o</i>w
              </p>

              {/* form */}

              <form
                className=" w-7/12  mt-12 space-y-8"
                onSubmit={formik.handleSubmit}
              >
                {/* name */}
                <div className="relative">
                  <p
                    className={` pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium  bg-white ${
                      formik.touched.userName && Boolean(formik.errors.userName)
                        ? "text-purple-500"
                        : "text-neutral-600"
                    }`}
                  >
                    Name
                  </p>
                  <input
                    placeholder={"Enter Your Name"}
                    type={"text"}
                    name="userName"
                    id="userName"
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.userName &&
                  Boolean(formik.errors.userName) ? (
                    <div className="mt-1 text-sm text-purple-600">
                      {formik.errors.userName}{" "}
                    </div>
                  ) : null}
                </div>
                {/* userMail */}
                <div className="relative">
                  <p
                    className={` pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium  bg-white ${
                      formik.touched.userMail && Boolean(formik.errors.userMail)
                        ? "text-purple-500"
                        : "text-neutral-600"
                    }`}
                  >
                    Email
                  </p>
                  <input
                    placeholder={"Enter Your userMail"}
                    type="email"
                    name="userMail"
                    id="userMail"
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    value={formik.values.userMail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.userMail &&
                  Boolean(formik.errors.userMail) ? (
                    <div className="mt-1 text-sm text-purple-600">
                      {formik.errors.userMail}
                    </div>
                  ) : null}
                </div>
                {/* password */}

                <div className="relative">
                  <p
                    className={` pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium  bg-white ${
                      formik.touched.userPassword &&
                      Boolean(formik.errors.userPassword)
                        ? "text-purple-500"
                        : "text-neutral-600"
                    }`}
                  >
                    Password
                  </p>
                  <input
                    placeholder={"Enter Your userPassword"}
                    type="password"
                    name="userPassword"
                    id="userPassword"
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                    value={formik.values.userPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.userPassword &&
                  Boolean(formik.errors.userPassword) ? (
                    <div className="mt-1 text-sm text-purple-600">
                      {formik.errors.userPassword}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="  w-full h-14 flex items-center justify-center py-2 px-4 bg-purple-600  hover:bg-purple-400 group ease-in-out duration-300"
                >
                  <p className="text-white group-hover:text-purple-800 text-sm ease-in-out duration-300">
                    {Loader && Loader.loading ? (
                      <ComponentLevelLoader
                        text={"Registering"}
                        color={"#fff"}
                        loading={Loader && Loader.loading}
                      />
                    ) : (
                      "Register"
                    )}
                  </p>
                </button>
              </form>
              <div className="w-7/12 flex flex-col items-end justify-center mt-10">
                <p className="text-sm text-neutral-900 ">
                  You have an account ?
                </p>

                <Link
                  href={"/login"}
                  className="w-5/12 h-14 flex items-center justify-center py-2 px-4 mt-4 bg-purple-600  hover:bg-purple-400 transition-all ease-in-out duration-300 group"
                >
                  <p className=" text-sm  text-white group-hover:text-purple-800 ease-in-out duration-300">
                    Login
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
