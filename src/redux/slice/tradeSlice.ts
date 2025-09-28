"use client";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  trade: {
    status: false,
  },
};
export const TradeSlice = createSlice({
  name: "TradeSlice",
  initialState: initialState,
  reducers: {
    updatestatus: (state, action) => {
      state.trade = action.payload;
    },
    opentrade: (state) => {
      state.trade.status = true;
    },
    closetrade: (state) => {
      state.trade.status = false;
    },
    gettrade: (state) => {
      state.trade;
    },
  },
});

export const { updatestatus, gettrade, closetrade, opentrade } =
  TradeSlice.actions;
export default TradeSlice.reducer;
