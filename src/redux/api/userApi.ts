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
        url: `/user/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
    updatePhoto: build.mutation({
      query: (body: any) => ({
        url: `/user/photo`,
        method: "POST",
        data: body,
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
