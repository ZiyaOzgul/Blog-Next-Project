"use client";

import Cookies from "js-cookie";

export const addUserDetails = async (formData) => {
  console.log("Add new post req came");

  try {
    const res = await fetch(`/api/user/add-user-details`, {
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

// ? Get usersPosts

export const getUserPosts = async (userID) => {
  try {
    const res = await fetch(`/api/user/get-users-posts?id=${userID}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("blog-token")}`,
      },
      cache: "no-cache",
    });
    const responseData = res.json();
    return responseData;
  } catch (error) {
    console.log("error", error);
  }
};
// ?Get usersDetails
export const getUserDetails = async (userID) => {
  try {
    const res = await fetch(`/api/user/get-users-details?id=${userID}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("blog-token")}`,
      },
      cache: "no-cache",
    });
    const responseData = res.json();
    return responseData;
  } catch (error) {
    console.log("error", error);
  }
};
