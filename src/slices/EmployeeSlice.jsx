import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const employeeSlice = createApi({
  reducerPath: "employees",
  // refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}`,
  }),
  tagTypes: ["employees"],
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "/employees",
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: employeeData,
      }),
      invalidatesTags: ["employees"],
    }),

    getAllemployee: builder.query({
      query: () => "/employees",
      providesTags: ["employees"],
    }),

    getSingleEmployee: builder.query({
      query: (id) => `/employees/${id}`,
      providesTags: ["employees"],
    }),

    updateEmployee: builder.mutation({
      query: ({ updatedEmployeeData, employeeId }) => ({
        url: `/employees/${employeeId}`,
        headers: {
          "content-type": "application/json",
          Accept: "application/json", // Add Accept header
        },
        method: "PUT",
        body: updatedEmployeeData,
      }),
      invalidatesTags: ["employees"],
    }),

    deleteEmployee: builder.mutation({
      query: (employeeId) => ({
        url: `/employees/${employeeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employees"],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetAllemployeeQuery,
  useGetSingleEmployeeQuery,
  useUpdateEmployeeMutation,
} = employeeSlice;
