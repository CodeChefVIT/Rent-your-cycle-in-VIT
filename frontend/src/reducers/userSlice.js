import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    token: "",
    isAuth: "",
  },
  reducers: {
    set_user: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    remove_user: (state) => {
      state.id = "";
      state.token = "";
      state.isAuth = "";
    },
  },
});

export const { set_user, remove_user } = userSlice.actions;
export const userSelector = (state) => ({
  id: state.user.id,
  token: state.user.token,
  isAuth: state.user.isAuth,
});

export default userSlice.reducer;
