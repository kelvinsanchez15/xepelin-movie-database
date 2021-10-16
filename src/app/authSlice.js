import { createSlice } from "@reduxjs/toolkit";
import { api } from "./services/auth";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    logoutCurrentUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.signup.matchFulfilled, (state, { payload }) => {
        state.user = payload;
        state.token = payload.token;
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.user = payload;
        state.token = payload.token;
      });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const { logoutCurrentUser } = slice.actions;
