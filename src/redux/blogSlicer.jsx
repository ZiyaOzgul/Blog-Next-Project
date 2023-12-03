"use client";

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getInitialStateFromLocalStorage = () => {
  const storedState = localStorage.getItem("user");
  return storedState ? JSON.parse(storedState) : [];
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    componentLevelLoader: { loading: false, id: "" },
    pageLevelLoader: false,

    user: Cookies.get("token") ? getInitialStateFromLocalStorage() : [], // Change !== 0 to ??
    isLogged: Cookies.get("token") ? true : false,
    posts: [],
    currentPost: [],

    //delete
    repeatItems: [
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
      {
        id: 1,
      },
    ],
  },
  reducers: {
    setComponentLevelLoader: (state, action) => {
      state.componentLevelLoader.loading = action.payload.loading;
      state.componentLevelLoader.id = action.payload.id;
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
      console.log(Cookies.get("token"));
    },
    setUserLog: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const {
  setComponentLevelLoader,
  setPageLevelLoading,
  setLoggedUser,
  resetLoggedUser,
  setUserLog,
} = blogSlice.actions;
export default blogSlice.reducer;
