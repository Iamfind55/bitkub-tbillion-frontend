"use client";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import counterReducer from "./slice/counterSlice";
import dialogReducer from "./slice/dialogSlice";
import { Authslice } from "./slice/authSlice";
import { Walletslice } from "./slice/walletSlice";
import tradeSlice, { TradeSlice } from "./slice/tradeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dialog: dialogReducer,
    auth: Authslice.reducer,
    wallet: Walletslice.reducer,
    trade: TradeSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
