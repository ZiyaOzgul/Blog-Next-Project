"use client";

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getInitialStateFromLocalStorage = () => {
  const storedState = localStorage.getItem("blog-user");
  return storedState ? JSON.parse(storedState) : [];
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    componentLevelLoader: { loading: false, id: "", type: "" },
    pageLevelLoader: false,

    user: Cookies.get("blog-token") ? getInitialStateFromLocalStorage() : [], // Change !== 0 to ??
    isLogged: Cookies.get("blog-token") ? true : false,
    posts: [],
    currentPost: [],
    userDetails: [],
    userPosts: [],
  },
  reducers: {
    setComponentLevelLoader: (state, action) => {
      state.componentLevelLoader.loading = action.payload.loading;
      state.componentLevelLoader.id = action.payload.id;
      state.componentLevelLoader.type = action.payload.type;
    },
    setPageLevelLoading: (state, action) => {
      state.pageLevelLoader = action.payload;
    },
    setLoggedUser: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    resetLoggedUser: (state, action) => {
      state.isLogged = false;
      state.user = [];
    },
    setUserLog: (state, action) => {
      state.isLogged = action.payload;
    },
    setAllPosts: (state, action) => {
      state.posts = action.payload;
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const {
  setComponentLevelLoader,
  setPageLevelLoading,
  setLoggedUser,
  resetLoggedUser,
  setUserLog,
  setAllPosts,
  setCurrentPost,
  setUserDetails,
  setUserPosts,
} = blogSlice.actions;
export default blogSlice.reducer;
