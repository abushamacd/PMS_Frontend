import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    getUserProfile: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/user/profile`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any) => {
        return {
          response,
        };
      },
      providesTags: [tagTypes.profile],
    }),
    updateProfile: build.mutation({
      query: (data: any) => ({
        url: `/user/profile`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    updatePhoto: build.mutation({
      query: (data: any) => ({
        url: `/user/photo`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUpdatePhotoMutation,
} = userApi;
