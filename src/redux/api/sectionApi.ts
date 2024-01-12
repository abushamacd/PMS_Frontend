import { ISection, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    createSection: build.mutation({
      query: (data: any) => ({
        url: `/section`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.section],
    }),
    getSections: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/section",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISection[], meta: IMeta) => {
        return {
          sections: response,
          meta,
        };
      },
      providesTags: [tagTypes.section],
    }),
    getSection: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/section/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.section],
    }),
    updateSectionPosition: build.mutation({
      query: (data: any) => ({
        url: `/section`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.section],
    }),
    updateSection: build.mutation({
      query: (data: { id: any; body: any }) => ({
        url: `/section/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.section],
    }),
    deleteSection: build.mutation({
      query: (id: string) => ({
        url: `/section/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.section],
    }),
  }),
});

export const {
  useCreateSectionMutation,
  useGetSectionsQuery,
  useUpdateSectionPositionMutation,
  useGetSectionQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = authApi;
