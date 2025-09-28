"use client";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getCookie = (key: any) => {
  return typeof window !== "undefined" ? Cookies.get(key) : "";
};

const initialState = {
  user: {
    userid: getCookie("userid") || "",
    name: getCookie("name") || "",
    email: getCookie("email") || "",
    role: getCookie("role") || "",
    token: getCookie("token") || "",
    refreshToken: getCookie("refreshToken") || "",
  },
};
export const Authslice = createSlice({
  name: "AuthSlice",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state = {
        user: {
          userid: "",
          name: "",
          email: "",
          role: "",
          token: "",
          refreshToken: "",
        },
      };
      Object.keys(state.user).forEach((key) => Cookies.remove(key));
      window.location.href = "/login";
    },
    auth: (state) => {
      state.user;
    },
  },
});

export const { login, logout, auth } = Authslice.actions;
export default Authslice.reducer;
