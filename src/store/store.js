import { configureStore } from "@reduxjs/toolkit";
import { employeeSlice } from "../slices/EmployeeSlice";
// import { logInApiSlice } from "../features/api/logInApiSlice";

export const store = configureStore({
  reducer: {
    [employeeSlice.reducerPath]: employeeSlice.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(employeeSlice.middleware),
});
