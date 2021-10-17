import { createSlice } from "@reduxjs/toolkit";
import { api } from "./services/auth";

const slice = createSlice({
  name: "favoritesMovies",
  initialState: { movies: [] },
  reducers: {
    clearFavoritesMovies: (state) => {
      state.movies = [];
    },
  },
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

export const selectFavoritesMovies = (state) => state.favoritesMovies.movies;

export const { clearFavoritesMovies } = slice.actions;
