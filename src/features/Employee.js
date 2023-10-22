import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: {
    email: "",
    token: "",
    first_name: "",
    isauthenticated: false,
  },
};

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    login: (state, action) => {
      state.employee.email = action.payload.email;
      state.employee.token = action.payload.token;
      state.employee.first_name = action.payload.first_name;
      state.employee.isauthenticated = true;
    },

    logout: (state, action) => {
      state.employee = initialState;
    },
  },
});

export const { login, logout } = EmployeeSlice.actions;

export default EmployeeSlice.reducer;
