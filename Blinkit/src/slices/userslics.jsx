import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
  name: "User",
  initialState: {
    userdata: {},
  },
  reducers: {
    userLogedIn: (state, action) => {
      console.log("action.payload", action.payload);
      state.userdata = action.payload;
    },
  },
});
export const useractions = userslice.actions;
export default userslice;
