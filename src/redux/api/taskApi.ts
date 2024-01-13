import { ITask, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    createTask: build.mutation({
      query: (data: any) => ({
        url: `/task`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.task],
    }),
    getTasks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/task",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ITask[], meta: IMeta) => {
        return {
          tasks: response,
          meta,
        };
      },
      providesTags: [tagTypes.task],
    }),
    getTask: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.task],
    }),
    updateTaskPosition: build.mutation({
      query: (data: any) => ({
        url: `/task`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.task],
    }),
    updateTask: build.mutation({
      query: (data: { id: any; body: any }) => ({
        url: `/task/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.task],
    }),
    deleteTask: build.mutation({
      query: (id: string) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.task],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskPositionMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
