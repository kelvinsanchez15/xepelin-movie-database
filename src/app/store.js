import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/auth";
import authReducer from "./authSlice";
import favoritesMoviesReducer from "./favoritesMoviesSlice";

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    favoritesMovies: favoritesMoviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
