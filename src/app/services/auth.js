import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    getFavoritesMovies: builder.mutation({
      query: () => ({
        url: "favorites",
        method: "GET",
      }),
    }),
    protected: builder.mutation({
      query: () => "protected",
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetFavoritesMoviesMutation,
  useProtectedMutation,
} = api;
