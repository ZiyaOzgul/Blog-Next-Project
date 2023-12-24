"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import Notification from "./notification/Notification";
import PersonIcon from "@mui/icons-material/Person";
import { resetLoggedUser } from "@/redux/blogSlicer";
import Cookies from "js-cookie";
import ComponentLevelLoader from "./componentLevelLoader/ComponentLevelLoader";
import { toast } from "react-toastify";
import { PencilIcon } from "@heroicons/react/24/solid";
import { UilSignOutAlt, UilUser } from "@iconscout/react-unicons";
const Navbar = () => {
  const [currentPage, setCurrentPage] = useState();

  const dispatch = useDispatch();

  const pathName = typeof window !== "undefined" ? usePathname() : null;
  const router = typeof window !== "undefined" ? useRouter() : null;
  const currentUser = useSelector((state) => state.blog.user);
  const userLog = useSelector((state) => state.blog.isLogged);
  const Loader = useSelector((state) => state.blog.componentLevelLoader);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setCurrentPage(pathName);
  }, [pathName]);

  const handleLogOut = () => {
    Cookies.remove("blog-token");
    localStorage.removeItem("blog-user");
    dispatch(resetLoggedUser());
    console.log(userLog, "user length ->");
    if (!userLog) {
      toast.success("Successfully logged out.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="w-full h-10v sm:block z-20  flex bg-white/0  relative   ">
      <div className="w-full h-full flex  justify-center p-6 ">
        <div className="w-full flex justify-between space-x-4">
          <div
            className="flex-1 flex flex-col items-center justify-start cursor-pointer hover:scale-105 ease-in-out duration-300 "
            onClick={() => router.push("/")}
          >
            <i className="font-extrabold text-4xl text-neutral-900">
              <i className="text-5xl text-purple-600">Ziya's </i>
              Blog
            </i>
            <p className="font-medium text-neutral-600">
              Write Your <i className="text-xl text-purple-500">Code!</i>
            </p>
          </div>
          <div className="flex-4 flex items-center justify-start space-x-6">
            <Link href={"/"}>
              <p
                className={`font-semibold text-xl ${
                  currentPage == "/" ? "selected relative" : "link"
                }`}
                // onClick={() => setCurrentPage("Add")}
              >
                Home
              </p>
            </Link>
            <Link href={"/posts"}>
              <p
                className={`font-semibold text-xl ${
                  currentPage == "/posts" ? "selected relative" : "link"
                }`}
                // onClick={() => setCurrentPage("Add")}
              >
                Posts
              </p>
            </Link>
            <Link href={"/about"}>
              <p
                className={`font-semibold text-xl ${
                  currentPage == "/about" ? "selected relative" : "link"
                }`}
                // onClick={() => setCurrentPage("Add")}
              >
                About
              </p>
            </Link>
          </div>
          {/* {currentUser.length !== 0 ? (
            <div className="flex flex-1 items-center justify-center sm:space-x-4">
              <div className="flex items-start justify-center sm:space-x-2 cursor-pointer group">
                <PersonIcon className="text-xl  " />
                <p className="font-medium text-lg">{currentUser.name} </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center sm:space-x-4">
              <div className="flex items-center justify-center space-x-2">
                <Link href={"/login"} className="max-w-[256px] mr-4 h-10">
                  <button className="w-full h-full border bg-purple-50 border-purple-700 hover:border-purple-600 hover:bg-purple-600 transition-all ease-in-out duration-300 flex items-center justify-center group py-2 px-4 text-purple-600 hover:text-white  ">
                    LogIn
                  </button>
                </Link>
                <Link href={"/register"} className="max-w-[256px] mr-4 h-10">
                  <button className="w-full h-full border bg-purple-50 border-purple-700 hover:border-purple-600 hover:bg-purple-600 transition-all ease-in-out duration-300 flex items-center justify-center group py-2 px-4 text-purple-600 hover:text-white  ">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          )} */}
          {userLog ? (
            <div className="flex flex-1 items-center justify-end">
              <div
                className="w-8/12 flex items-center justify-center sm:space-x-6 relative "
                onMouseEnter={() => setHover(true)}
              >
                <div
                  className="flex items-center justify-center space-x-2 border border-purple-400/30 p-2 rounded-lg group hover:border-purple-400  hover:bg-purple-500 hover:text-white hover:shadow-xl shadow-purple-300 transition-all ease-in duration-300 cursor-pointer  "
                  onClick={() => router.push("/add-note")}
                >
                  <PencilIcon className="w-6 h-6 text-sm group-hover:scale-110 ease-in duration-300" />
                  <p className="font-medium text-sm group-hover:translate-x-1 ease-in duration-300">
                    Add Post
                  </p>
                </div>
                <div
                  className={`h-auto flex
                      flex-col items-center justify-center group `}
                >
                  <div className="flex items-center justify-center sm:space-x-2 cursor-pointer group relative">
                    <PersonIcon className="text-xl" />
                    <p className="font-medium text-lg">{currentUser.name}</p>
                  </div>
                  <div
                    className={`w-40 max-w-[400] bg-white absolute top-12 rigt-0 rounded-lg overflow-hidden flex items-start justify-start  z-20 ${
                      hover ? "flex" : "hidden"
                    } `}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <div className=" w-full h-auto flex flex-col items-center justify-start ">
                      <div
                        onClick={() =>
                          router.push(`/profile/${currentUser.id}`)
                        }
                        className="w-full h-5v flex items-center justify-start group/item border  hover:bg-purple-600 ease-in-out duration-300 space-x-2 cursor-pointer p-1"
                      >
                        <UilUser className="w-10 h-10 text-purple-600 group-hover/item:text-white ease-in-out duration-300" />
                        <p className="text-sm text-purple-600 group-hover/item:text-white group-hover/item:translate-x-2 transition-alll ease-in-out duration-300">
                          Profile
                        </p>
                      </div>
                      <div
                        onClick={() => handleLogOut()}
                        className="w-full h-5v flex items-center justify-start group/item  hover:bg-purple-600 ease-in-out duration-300 space-x-2 cursor-pointer p-1"
                      >
                        <UilSignOutAlt className="w-10 h-10 text-purple-600 group-hover/item:text-white ease-in-out duration-300" />
                        <p className="text-sm text-purple-600 group-hover/item:text-white group-hover/item:translate-x-2 transition-alll ease-in-out duration-300">
                          Log Out
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <div className="opacity-0 group-hover:opacity-100 mt-4  w-full h-15v  flex flex-col items-start justify-start space-y-1 z-10">
                    <button className="w-full h-5v bg-gray-100 border-none hover:bg-purple-500 hover:border border-purple-400 hover:text-white hover:shadow-md shadow-purple-300 transition-all ease-in duration-300">
                      Log out
                    </button>
                  </div> */}
                </div>

                {/* <div className="md:ml-20">
                  <button
                    onClick={() => handleLogOut()}
                    className="w-full h-full border bg-purple-50 border-purple-700 hover:border-purple-600 hover:bg-purple-600 transition-all ease-in-out duration-300 flex items-center justify-center group py-2 px-4 text-purple-600 hover:text-white  "
                  >
                    {Loader && Loader.loading && Loading.type == 'logout' ? (
                      <ComponentLevelLoader
                        text={"Logging Out"}
                        color={"#fff"}
                        loading={Loader && Loader.loading}
                      />
                    ) : (
                      "Log Out"
                    )}
                  </button>
                </div> */}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center sm:space-x-4">
              <div className="flex items-center justify-center space-x-2">
                <Link
                  href="/login"
                  className="max-w-[256px] mr-4 h-10 border bg-purple-50 border-purple-700 hover:border-purple-600 hover:bg-purple-600 transition-all ease-in-out duration-300 flex items-center justify-center group py-2 px-4 text-purple-600 hover:text-white"
                >
                  LogIn
                </Link>
                <Link
                  href="/register"
                  className="max-w-[256px] mr-4 h-10 border bg-purple-50 border-purple-700 hover:border-purple-600 hover:bg-purple-600 transition-all ease-in-out duration-300 flex items-center justify-center group py-2 px-4 text-purple-600 hover:text-white"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Navbar;
