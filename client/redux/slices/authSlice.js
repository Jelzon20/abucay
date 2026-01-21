// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null, // null means not logged in
  officials: [],

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    setOfficials: (state, action) => {
      state.officials = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
       state.officials = [];
    },
  },
});

export const { loginSuccess, logout, setOfficials } = authSlice.actions;
export default authSlice.reducer;