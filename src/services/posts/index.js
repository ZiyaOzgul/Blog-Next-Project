"use server";
import Cookies from "js-cookie";

// ! add new post
export const addNewPost = async (formData) => {
  console.log("Add new post req came");
  try {
    const res = await fetch(`${process.env.Server_URL}/api/add-note`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("blog-token")}`,
      },
      body: JSON.stringify(formData),
    });
    const responseData = res.json();
    return responseData;
  } catch (error) {
    console.log("error ", error);
  }
};

// ! get all posts

export const getAllPostsAsync = async () => {
  console.log("all posts req");
  try {
    const res = await fetch(
      `${process.env.Server_URL}/api/posts/get-all-posts`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const responseData = res.json();
    return responseData;
  } catch (error) {
    console.log("error", error);
  }
};

// ! get selected post

export const getSelectedPostAsync = async (postID) => {
  console.log("selected post req");
  try {
    const res = await fetch(
      `${process.env.Server_URL}/api/posts/get-current-post?id=${postID}`
    );
    const responseData = res.json();
    return responseData;
  } catch (error) {
    console.log("error", error);
  }
};
