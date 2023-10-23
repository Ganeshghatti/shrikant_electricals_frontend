import { configureStore } from "@reduxjs/toolkit";
import { EmployeeSlice } from "../features/Employee";
import { loadingSlice } from "../features/Loader";

export const store = configureStore({
  reducer: {
    employee: EmployeeSlice.reducer,
    loading: loadingSlice.reducer,
  },
});
