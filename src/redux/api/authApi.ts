import { baseApi } from "./baseApi";
const AUTH_PATH = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    signUp: build.mutation({
      query: (userData: any) => ({
        url: `${AUTH_PATH}/signup`,
        method: "POST",
        data: userData,
      }),
    }),
    signIn: build.mutation({
      query: (userData: any) => ({
        url: `${AUTH_PATH}/signin`,
        method: "POST",
        data: userData,
      }),
    }),
    activation: build.mutation({
      query: (token: string) => ({
        url: `${AUTH_PATH}/activation/${token}`,
        method: "patch",
      }),
    }),
    changePassword: build.mutation({
      query: (body: any) => ({
        url: `${AUTH_PATH}/change-password`,
        method: "patch",
        data: body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useActivationMutation,
  useChangePasswordMutation,
} = authApi;
