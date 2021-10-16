import { createSlice } from "@reduxjs/toolkit";
import { api } from "./services/auth";

const slice = createSlice({
  name: "favoritesMovies",
  initialState: { movies: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getFavoritesMovies.matchFulfilled,
      (state, { payload }) => {
        state.movies = payload;
      }
    );
  },
});

export default slice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
