"use client";
import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";
import blogReducer from "./blogSlicer";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
