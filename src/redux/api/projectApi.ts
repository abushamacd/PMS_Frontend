import { IProject, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    createProject: build.mutation({
      query: (data: any) => ({
        url: `/project`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.project],
    }),
    getProjects: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/project",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IProject[], meta: IMeta) => {
        return {
          projects: response,
          meta,
        };
      },
      providesTags: [tagTypes.project],
    }),
    getProject: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.project, tagTypes.section, tagTypes.task],
    }),
    updateProjectPosition: build.mutation({
      query: (data: any) => ({
        url: `/project`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.project],
    }),
    updateProject: build.mutation({
      query: (data: { id: any; body: any }) => ({
        url: `/project/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.project],
    }),
    deleteProject: build.mutation({
      query: (id: string) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.project],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectPositionMutation,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = authApi;
