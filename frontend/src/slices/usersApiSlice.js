import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    forgotPasswordMail: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: `${USERS_URL}/reset-password?token=${token}`,
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),
    deleteUsers: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUsers: builder.mutation({
      query: (details) => ({
        url: `${USERS_URL}/${details?.userId}`,
        body: details,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    getUserByID: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useForgotPasswordMailMutation,
  useResetPasswordMutation,
  useProfileMutation,
  useGetAllUsersQuery,
  useDeleteUsersMutation,
  useUpdateUsersMutation,
  useGetUserByIDQuery,
} = usersApiSlice;
