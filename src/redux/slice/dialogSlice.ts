import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface dialogValue {
  isOpen: boolean;
  status: any;
  autoRefresh: boolean;
}

const initialState: dialogValue = {
  isOpen: false,
  status: null,
  autoRefresh: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<any>) => {
      state.isOpen = action.payload.isOpen;
      state.status = action.payload.status;
    },
    setRefresh: (state, action) => {
      state.autoRefresh = action.payload;
    },
    clearRefresh: (state) => {
      state.autoRefresh = false; 
    },
  },
});


export const { setIsOpen, setRefresh, clearRefresh } = dialogSlice.actions;
export default dialogSlice.reducer;
