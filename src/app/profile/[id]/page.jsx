"use client";
import {
  setComponentLevelLoader,
  setPageLevelLoading,
  setUserDetails,
  setUserPosts,
} from "@/redux/blogSlicer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import {
  UilTimesCircle,
  UilCloudUpload,
  UilTimes,
  UilTrash,
} from "@iconscout/react-unicons";
import { validationSchema } from "./validations";
import ComponentLevelLoader from "@/components/componentLevelLoader/ComponentLevelLoader";
import { firebaseConfig, firebaseConnectUrl } from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addUserDetails,
  deletePostOnDB,
  getUserDetails,
  getUserPosts,
} from "@/services/user";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
const page = ({ params }) => {
  const userID = params.id;

  const currentUser = useSelector((state) => state.blog.user);
  const currentUserDetails = useSelector((state) => state.blog.userDetails);
  const currentUserPosts = useSelector((state) => state.blog.userPosts);
  const dispatch = useDispatch();
  const Loader = useSelector((state) => state.blog.componentLevelLoader);
  const PageLoader = useSelector((state) => state.blog.pageLevelLoader);

  const [profileImageShow, setProfileImageShow] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [profileModal, setProfileModal] = useState({ show: false, img: "" });

  const [userUpdate, setUserUpdate] = useState({
    profileDetails: "",

    profileImg: "",
  });

  useEffect(() => {
    handleGetUserDetails(userID);
  }, [userID]);

  // upload image on firebase

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app, firebaseConnectUrl);

  const createUniqueFileName = (data) => {
    const timeStamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 12);
    return `${data.name}-${timeStamp}-${randomString}`;
  };

  const firebaseUploadImage = async (file) => {
    const createFileName = createUniqueFileName(file);
    console.log(createFileName);
    const sotrageRef = ref(storage, `Blog/userData/${createFileName}`);
    const uploadImg = uploadBytesResumable(sotrageRef, file);

    return new Promise((resolve, reject) => {
      uploadImg.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadImg.snapshot.ref)
            .then((getDownloadURL) => resolve(getDownloadURL))
            .catch((err) => reject(err));
        }
      );
    });
  };

  const formik = useFormik({
    initialValues: userUpdate,
    onSubmit: (e) => {
      const userDetailsForm = {
        userID: userID,
        profileDetails: e.profileDetails,
        profileImg: e.profileImg,
      };
      handleSubmitData(userDetailsForm);
      console.log(userDetailsForm);
    },
    validationSchema: validationSchema,
  });

  const handleSubmitData = async (userDetailsForm) => {
    dispatch(
      setComponentLevelLoader({
        loading: true,
        id: "",
        type: "Load",
      })
    );
    const profileImageUrl = await firebaseUploadImage(
      userDetailsForm.profileImg
    );
    const sendData = {
      userID: userDetailsForm.userID,
      profileImg: profileImageUrl,
      profileDetails: userDetailsForm.profileDetails,
    };
    const request = await addUserDetails(sendData);
    if (request.success) {
      dispatch(
        setComponentLevelLoader({
          loading: false,
          id: "",
          type: "",
        })
      );
      toast.success(request.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      handleGetUserDetails(userID);
      formik.resetForm();
      setShowModal(false);
    } else {
      dispatch(
        setComponentLevelLoader({
          loading: false,
          id: "",
          type: "",
        })
      );
      toast.error(request.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // getUserData
  const handleGetUserDetails = async (userID) => {
    dispatch(setPageLevelLoading(true));
    const userPosts = await getUserPosts(userID);
    const userDetails = await getUserDetails(userID);
    if (userPosts.success && userDetails.success) {
      dispatch(setUserDetails(userDetails.data));
      dispatch(setUserPosts(userPosts.data));
      dispatch(setPageLevelLoading(false));
    } else {
      toast.error(userDetails.message, { position: toast.POSITION.TOP_RIGHT });
      router.reload(window.location.pathname);
    }
  };

  // ? handleDelete post
  const handleDeletePost = async (postID) => {
    dispatch(
      setComponentLevelLoader({ loading: true, id: postID, type: "delete" })
    );
    const requestResponse = await deletePostOnDB(postID);
    if (requestResponse.success) {
      toast.success(requestResponse.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setComponentLevelLoader({ loading: false, id: "", type: "" }));
      const userPosts = await getUserPosts(userID);
      dispatch(setUserPosts(userPosts.data));
    } else {
      toast.error(requestResponse.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(setComponentLevelLoader({ loading: false, id: "", type: "" }));
    }
  };

  const handleUpdate = (user) => {
    setUserUpdate({
      profileDetails: user.profileDetails,
      profileImg: user.profileImg,
    });
    setShowModal(true);
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
      <div className="w-screen h-auto flex items-start justify-start my-6 px-10 space-x-2 relative  ">
        <div className="w-4/5 flex flex-col items-start justify-start">
          <div className="w-full max-h-[%40] p-6 border-2 border-neutral-900 rounded-xl  overflow-hidden">
            {/* if user data is null */}
            {currentUser.length != 0 ? (
              <div className="w-full h-auto flex flex-col items-start justify-start ">
                <div className="w-full h-auto flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-neutral-800">
                    Profile Details
                  </h1>
                  <PlusCircleIcon
                    onClick={() => setShowModal(true)}
                    className="h-10 w-10 text-gray-500  hover:text-neutral-800 hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
                  />
                </div>
                <p className="w-full text-lg text-neutral-900 ">
                  {currentUserDetails.userDetails}
                </p>
              </div>
            ) : (
              <div className="w-full h-auto flex flex-col items-start justify-start ">
                <div className="w-full h-auto flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-neutral-800">
                    Profile Details
                  </h1>
                  <PlusCircleIcon
                    onClick={() => setShowModal(true)}
                    className="h-10 w-10 text-gray-500  hover:text-neutral-800 hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
                  />
                </div>
                <p className="w-full text-lg text-neutral-800 ">
                  You are not talked about yourself. Tell us your story.
                </p>
              </div>
            )}
          </div>
          <div className="w-full h-auto flex flex-col items-start justify-start space-y-4 mt-10">
            <h1 className="text-2xl font-bold text-gray-900">Your Posts</h1>
            {/* ? Card Area */}
            {currentUserPosts.map((item) => (
              <div
                className="w-full h-15v border-2 border-gray-900 p-6 flex items-start justify-start rounded-lg overflow-hidden"
                key={item._id}
              >
                <div className="w-2/5 h-full flex flex-col items-start justify-start space-y-2">
                  <h1 className="text-xl font-medium text-neutral-900">
                    {item.postTitle}
                  </h1>
                  <p className="text-lg text-neutral-800">
                    {item.postDescription}
                  </p>
                </div>
                <div className="w-2/5 flex items-start justify-start">
                  <img
                    src={item.postImg}
                    alt=""
                    className="rounded-lg h-10v md:w-2/4 object-cover shadow-lg cursor-pointer hover:scale-110 ease-in-out duration-300"
                    onClick={() =>
                      setProfileModal({
                        show: true,
                        img: item.postImg,
                      })
                    }
                  />
                </div>
                <div className="w-1/5 h-full flex flex-col items-end justify-start space-y-2">
                  <div
                    className="w-full flex items-center justify-center group/item space-x-2 cursor-pointer "
                    onClick={() => handleUpdate(item)}
                  >
                    <UilCloudUpload className="w-10 h-10 text-purple-500 group-hover/item:text-white group-hover/item:bg-purple-600 transition-all ease-in-out duration-300 rounded-xl" />
                    <p className="text-purple-500 text-base  group-hover/item:translate-x-2 transition-all ease-in-out duration-300 rounded-xl">
                      Update
                    </p>
                  </div>
                  <div
                    className="w-full flex items-center justify-center group/item space-x-2 cursor-pointer "
                    onClick={() => handleDeletePost(item._id)}
                  >
                    <UilTrash className="w-10 h-10 text-red-400 group-hover/item:text-white group-hover/item:bg-red-600 transition-all ease-in-out duration-300 rounded-xl" />
                    <p className="text-red-400 text-base  group-hover/item:translate-x-2 transition-all ease-in-out duration-300 rounded-lg">
                      Delete
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/5 flex flex-col items-start justify-start">
          <div className="flex flex-col items-start justify-start p-6 rounded-xl border-2 border-neutral-900 w-full max-h-[%40]">
            <div className="w-full h-10v flex items-center justify-center">
              <img
                src={currentUserDetails.userImage}
                alt="user image"
                className="rounded-full h-20 w-20 my-2 object-center hover:scale-110 ease-in-out duration-300 cursor-pointer"
                onClick={() =>
                  setProfileModal({
                    show: true,
                    img: currentUserDetails.userImage,
                  })
                }
              />
            </div>
            <h1 className="w-full text-xl font-semibold text-neutral-900 mt-2">
              {currentUser.name}
            </h1>
            <p className="text-neutral-800 text-lg font-medium mt-2">
              {currentUser.email}
            </p>
          </div>
        </div>
        {/* modal */}
        <div
          className={`${
            showModal ? "flex" : "hidden"
          } absolute -top-32 -left-2 w-screen   h-100v  items-center justify-center bg-black/30 z-20 overflow-x-hidden`}
        >
          <div className="w-full h-full flex flex-col items-center justify-between px-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
            <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row ">
              <div className="w-full mt-10 relative max-w-2xl lg:mt-0 lg:w-10/12 rounded-lg overflow-hidden">
                <div className="absolute right-1 top-1 z-20 cursor-pointer">
                  <UilTimesCircle
                    className="w-10 h-10 text-red-500 hover:text-red-600 ease-in-out duration-300"
                    onClick={() => {
                      setShowModal(false);
                      formik.resetForm();
                    }}
                  />
                </div>
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

                    {/* birth date */}

                    {/* image preview */}
                    {profileImageShow != "" ? (
                      <div className="w-full h-auto flex items-center  justify-center flex-wrap space-x-2 md:space-x-6 my-4">
                        <img
                          src={profileImageShow}
                          alt="image"
                          className="object-center w-20 h-20 rounded-full "
                        />
                      </div>
                    ) : (
                      <div className="w-full h-auto flex items-center  justify-center flex-wrap space-x-2 md:space-x-6 my-4">
                        <img
                          src={
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          }
                          alt="image"
                          className="object-center w-20 h-20 rounded-full "
                        />
                      </div>
                    )}
                    {/* userImage  */}
                    <div className="relative mt-4">
                      <p
                        className={` pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium  bg-white ${
                          formik.touched.profileImg &&
                          Boolean(formik.errors.profileImg)
                            ? "text-red-400"
                            : "text-neutral-600"
                        }`}
                      >
                        User Image
                      </p>
                      <input
                        id="profileImg"
                        name="profileImg"
                        type="file"
                        accept="image/*"
                        multiple
                        className="file:px-6 file:py-3 file:border-none file:rounded-full file:text-neutral-800 file:cursor-pointer file:shadow-lg  placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md text-white"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];

                          if (file) {
                            const objectUrl = URL.createObjectURL(file);
                            setProfileImageShow(objectUrl);
                            formik.setFieldValue("profileImg", file);
                          }
                        }}
                        //   console.log(event.currentTarget.files);
                        //   const filesArray = Array.from(
                        //     event.currentTarget.files[0]
                        //   );
                        //   const objectUrl = URL.createObjectURL(
                        //     event.currentTarget.files[0]
                        //   );
                        //   setProfileImageShow(objectUrl);
                        //   formik.setFieldValue("profileImg", filesArray);
                        // }}
                      />
                      {formik.touched.profileImg &&
                      Boolean(formik.errors.profileImg) ? (
                        <div className="mt-1 text-sm text-red-500">
                          {formik.errors.profileImg}
                        </div>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="  w-full h-14 flex items-center justify-center py-2 px-4 bg-purple-600  hover:bg-purple-400 group ease-in-out duration-300 rounded-lg overflow-hidden"
                    >
                      <p className="text-white group-hover:text-purple-800 text-sm ease-in-out duration-300">
                        {Loader && Loader.loading && Loader.type == "Load" ? (
                          <ComponentLevelLoader
                            text={"Adding Details"}
                            color={"#fff"}
                            loading={Loader && Loader.loading}
                          />
                        ) : (
                          "Add"
                        )}
                      </p>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* profile pic modal */}
        <div
          className={`${
            profileModal.show ? "flex" : "hidden"
          } absolute -top-32 -left-2 w-screen   h-100v  items-center justify-center bg-black/30 z-20 overflow-x-hidden`}
        >
          <div
            className=" container "
            onClick={() => setProfileModal({ show: false, img: "" })}
          >
            <img src={profileModal.img} alt="" className="w-full h-4/5" />
          </div>
        </div>
      </div>
    );
  }
};

export default page;
