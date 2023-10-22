import { configureStore } from "@reduxjs/toolkit";
import { EmployeeSlice } from "../features/Employee";

export const store = configureStore({
  reducer: {
    employee: EmployeeSlice.reducer,
  },
});
