"use client";

import ComponentLevelLoader from "@/components/componentLevelLoader/ComponentLevelLoader";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { validationSchema } from "./validation";
import { initializeApp } from "firebase/app";
import { firebaseConfig, firebaseConnectUrl } from "@/utils";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { setComponentLevelLoader } from "@/redux/blogSlicer";
import { addNewPost } from "@/services/posts";
import { toast } from "react-toastify";

const page = () => {
  const dispatch = useDispatch();
  const router = typeof window !== "undefined" ? useRouter() : null;

  const Loader = useSelector((state) => state.blog.componentLevelLoader);
  const currentUser = useSelector((state) => state.blog.user);

  // firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app, firebaseConnectUrl);

  const createUniqueFileName = (data) => {
    const timeStamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 12);
    return `${data.name}-${timeStamp}-${randomString}`;
  };

  const firebaseUploadImage = async (files) => {
    const uploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const createFileName = createUniqueFileName(file);
        const storageRef = ref(storage, `Blog/${createFileName}`);
        const uploadImg = uploadBytesResumable(storageRef, file);

        uploadImg.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadImg.snapshot.ref)
              .then((downloadURL) => resolve(downloadURL))
              .catch((err) => reject(err));
          }
        );
      });
    });

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      return downloadURLs;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw error;
    }
  };

  const formik = useFormik({
    initialValues: {
      entryTitle: "",
      entryDesc: "",
      entryDetail: "",
      entryImg: [],
    },
    onSubmit: (e) => {
      const sendData = {
        userID: currentUser?.id,
        entryTitle: e.entryTitle,
        entryDesc: e.entryDesc,
        entryDetail: e.entryDetail,
        entryImg: e.entryImg,
      };
      console.log(sendData);
      handleAddPost(e);
    },
    validationSchema: validationSchema,
  });

  const handleAddPost = async (formData) => {
    dispatch(
      setComponentLevelLoader({
        loading: true,
        id: "",
        type: "add",
      })
    );

    const uploadImgUrl = await firebaseUploadImage(formData.entryImg);
    console.log("image array =>", uploadImgUrl);

    const sendData = {
      userID: currentUser?.id,
      entryTitle: formData.entryTitle,
      entryDesc: formData.entryDesc,
      entryDetail: formData.entryDetail,
      entryImg: uploadImgUrl,
    };
    const addRequest = await addNewPost(sendData);
    console.log(addRequest);
    if (addRequest.success) {
      dispatch(
        setComponentLevelLoader({
          loading: false,
          id: "",
          type: "",
        })
      );
      toast.success(addRequest.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        router.push("/posts");
      }, 1000);
      formik.resetForm();
    } else {
      dispatch(
        setComponentLevelLoader({
          loading: false,
          id: "",
          type: "",
        })
      );
      toast.error(addRequest.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="w-full h-auto mt-4 flex items-start justify-start p-6">
      <div className="md:w-1/2 full flex items-center justify-center ml-10 ">
        <img
          src="https://whoismocca.com/wp-content/uploads/2019/01/effizientes-organisiertes-arbeiten-buero-home-office-zuhause-produktiv-zeitmanagement-tipps-karriere-blog-whoismocca-7.jpg"
          alt=""
          className="max-w-6xl h-85v rounded-2xl"
        />
      </div>
      <div className="w-1/2 h-full">
        <div className="bg-white relative h-auto w-full ">
          <div className=" flex flex-col items-center justify-between px-10 mt-8 mr-auto  xl:px-5 lg:flex-row">
            <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row ">
              <div className="w-full  mt-10 relative max-w-4xl lg:mt-0 lg:w-10/12 h-85v">
                <div className=" flex flex-col items-center justify-start p-10 bg-white shadow-2xl relative z-10">
                  <p className="w-full text-4xl font-medium text-center font-serif">
                    Wr<i className="text-purple-600">i</i>te
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
                          formik.touched.entryTitle &&
                          Boolean(formik.errors.entryTitle)
                            ? "text-purple-500"
                            : "text-neutral-600"
                        }`}
                      >
                        Post Title
                      </p>
                      <input
                        placeholder={"Enter Post Title"}
                        autoComplete="off"
                        type={"text"}
                        name="entryTitle"
                        id="entryTitle"
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                        value={formik.values.entryTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.entryTitle &&
                      Boolean(formik.errors.entryTitle) ? (
                        <div className="mt-1 text-sm text-purple-600">
                          {formik.errors.entryTitle}
                        </div>
                      ) : null}
                    </div>

                    {/* entryDesc */}

                    <div className="relative">
                      <p
                        className={` pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium  bg-white ${
                          formik.touched.entryDesc &&
                          Boolean(formik.errors.entryDesc)
                            ? "text-purple-500"
                            : "text-neutral-600"
                        }`}
                      >
                        Post Description
                      </p>
                      <input
                        placeholder={"Enter Your description"}
                        autoComplete="off"
                        type="text"
                        name="entryDesc"
                        id="entryDesc"
                        className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                        value={formik.values.entryDesc}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.entryDesc &&
                      Boolean(formik.errors.entryDesc) ? (
                        <div className="mt-1 text-sm text-purple-600">
                          {formik.errors.entryDesc}
                        </div>
                      ) : null}
                    </div>

                    {/* Entry Details */}

                    <div className="relative">
                      <p
                        className={` pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium  bg-white ${
                          formik.touched.entryDetail &&
                          Boolean(formik.errors.entryDetail)
                            ? "text-purple-400"
                            : "text-neutral-600"
                        }`}
                      >
                        Product Desctiption
                      </p>
                      <textarea
                        placeholder={"Details"}
                        autoComplete="off"
                        type="text"
                        name="entryDetail"
                        id="entryDetail"
                        className=" border placeholder-gray-400 focus:outline-none focus:border-black w-full max-h-32 pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                        value={formik.values.entryDetail}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.entryDetail &&
                      Boolean(formik.errors.entryDetail) ? (
                        <div className="mt-1 text-sm text-purple-500">
                          {formik.errors.entryDetail}
                        </div>
                      ) : null}
                    </div>

                    {/* Entry Photo */}

                    <div className="relative">
                      <p
                        className={` pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium  bg-white ${
                          formik.touched.entryImg &&
                          Boolean(formik.errors.entryImg)
                            ? "text-red-400"
                            : "text-neutral-600"
                        }`}
                      >
                        Post Image
                      </p>
                      <input
                        id="entryImg"
                        name="entryImg"
                        type="file"
                        accept="image/*"
                        multiple
                        className="file:px-6 file:py-3 file:border-none file:rounded-full file:text-neutral-800 file:cursor-pointer file:shadow-lg  placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md text-white"
                        onChange={(event) => {
                          console.log(event.currentTarget.files);
                          const filesArray = Array.from(
                            event.currentTarget.files
                          );
                          formik.setFieldValue("entryImg", filesArray);
                        }}
                      />
                      {formik.touched.entryImg &&
                      Boolean(formik.errors.entryImg) ? (
                        <div className="mt-1 text-sm text-red-500">
                          {formik.errors.entryImg}
                        </div>
                      ) : null}
                    </div>

                    <button
                      type="submit"
                      className="  w-full h-14 flex items-center justify-center py-2 px-4 bg-purple-600  hover:bg-purple-400 group ease-in-out duration-300"
                    >
                      <p className="text-white group-hover:text-purple-800 text-sm ease-in-out duration-300">
                        {Loader && Loader.loading && Loader.type == "add" ? (
                          <ComponentLevelLoader
                            text={"Adding Post"}
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
      </div>
    </div>
  );
};

export default page;
