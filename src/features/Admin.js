import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "Admin",
  initialState: {
    isAdmin: false,
  },
  reducers: {
    Adminlogin: (state) => {
      state.isAdmin = true;
    },
    Adminlogout: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { Adminlogin, Adminlogout } = adminSlice.actions;

export default adminSlice.reducer;

