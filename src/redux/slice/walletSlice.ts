"use client";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  wallet: {
    balance: "0",
    refresh: false,
  },
};
export const Walletslice = createSlice({
  name: "WalletSlice",
  initialState: initialState,
  reducers: {
    updatewallet: (state, action) => {
      state.wallet = action.payload;
    }, 
    refreshwallet: (state) => {
      state.wallet.refresh = false;
    },
    wallet: (state) => {
      state.wallet;
    },
  },
});

export const { updatewallet, wallet, refreshwallet } = Walletslice.actions;
export default Walletslice.reducer;
