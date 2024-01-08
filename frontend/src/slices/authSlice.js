import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInformation")
    ? JSON.parse(localStorage.getItem("userInformation"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInformation = action.payload;
      localStorage.setItem("userInformation", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
